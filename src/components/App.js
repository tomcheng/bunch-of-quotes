import React, { Component } from "react";
import PropTypes from "prop-types";
import { quoteType } from "../utils/customPropTypes";
import findIndex from "lodash/findIndex";
import findKey from "lodash/findKey";
import keys from "lodash/keys";
import pick from "lodash/pick";
import uniq from "lodash/uniq";
import { generateCipher, applyCipher } from "../utils/cipher";
import { alphabet } from "../utils/constants";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent";
import Cryptogram from "./Cryptogram";
import Solved from "./Solved";

const MOBILE_SIZE = 1024;

class App extends Component {
  static propTypes = {
    currentQuote: quoteType.isRequired,
    solvedQuotes: PropTypes.arrayOf(quoteType).isRequired,
    onGetNewQuote: PropTypes.func.isRequired,
    onMarkAsSolved: PropTypes.func.isRequired
  };

  getInitialState = () => ({
    isMobile: window.innerWidth < MOBILE_SIZE,
    cipher: generateCipher(),
    guesses: {},
    hints: [],
    mistakes: [],
    selectedId: 1,
    isWinner: false,
    sidebarOpen: false,
    showSolved: false
  });

  constructor() {
    super();

    this.state = this.getInitialState();
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < MOBILE_SIZE });
  };

  handleKeyDown = evt => {
    if (alphabet.includes(evt.key.toUpperCase())) {
      this.handleGuess(evt.key.toUpperCase());
    } else if (evt.key === "Backspace") {
      this.handleDelete();
    } else if (evt.key === "ArrowLeft") {
      evt.preventDefault();
      if (evt.metaKey) {
        this.handleSelectPreviousWord();
      } else {
        this.handleSelectPreviousLetter();
      }
    } else if (evt.key === "ArrowRight") {
      evt.preventDefault();
      if (evt.metaKey) {
        this.handleSelectNextWord();
      } else {
        this.handleSelectNextLetter();
      }
    } else if (evt.key === "Tab") {
      evt.preventDefault();
      if (evt.shiftKey) {
        this.handleSelectPreviousOpenLetter();
      } else {
        this.handleSelectNextOpenLetter();
      }
    } else if (evt.key === "Enter" && this.state.isWinner) {
      this.handlePlayAgain();
    }
  };

  checkWin = guesses => {
    const { cipher } = this.state;

    return (
      this.getCharacters()
        .filter(c => !!c.id)
        .every(c => !!guesses[c.letter]) &&
      keys(guesses).every(key => {
        const guess = guesses[key];
        return cipher[guess] === key;
      })
    );
  };

  getCharacters = () => {
    const { currentQuote } = this.props;
    const { cipher } = this.state;

    return applyCipher(currentQuote.text, cipher)
      .split("")
      .map((letter, index) => ({
        id: alphabet.includes(letter) ? index + 1 : null,
        letter
      }));
  };

  getLetters = () => this.getCharacters().filter(c => c.id !== null);

  getOpenLettersWithSelected = () =>
    this.getLetters().filter(
      ({ letter, id }) =>
        !this.state.guesses[letter] || this.state.selectedId === id
    );

  getWordStartsWithSelected = () => {
    const { selectedId } = this.state;
    const characters = this.getCharacters();
    return characters.filter(
      ({ id }, index) =>
        (!!id && (!characters[index - 1] || !characters[index - 1].id)) ||
        id === selectedId
    );
  };

  selectLetter = id => {
    this.setState({ selectedId: id });
  };

  selectNext = letters => {
    const { selectedId } = this.state;
    const selectedIndex = findIndex(
      letters,
      letter => letter.id === selectedId
    );
    this.selectLetter(
      (selectedIndex === letters.length - 1
        ? letters[0]
        : letters[selectedIndex + 1]
      ).id
    );
  };

  handleSelectNextLetter = () => {
    this.selectNext(this.getLetters());
  };

  handleSelectPreviousLetter = () => {
    this.selectNext(this.getLetters().reverse());
  };

  handleSelectNextOpenLetter = () => {
    this.selectNext(this.getOpenLettersWithSelected());
  };

  handleSelectPreviousOpenLetter = () => {
    this.selectNext(this.getOpenLettersWithSelected().reverse());
  };

  handleSelectNextWord = () => {
    this.selectNext(this.getWordStartsWithSelected());
  };

  handleSelectPreviousWord = () => {
    this.selectNext(this.getWordStartsWithSelected().reverse());
  };

  getSelectedLetter = () =>
    this.getCharacters().find(c => c.id === this.state.selectedId).letter;

  handleSelectLetter = id => {
    this.setState({ selectedId: id });
  };

  handleGuess = guess => {
    const { guesses, mistakes, hints } = this.state;
    const letter = this.getSelectedLetter();
    const prevLetter = findKey(guesses, l => l === guess);

    if (hints.includes(letter)) {
      this.handleSelectNextLetter();
      return;
    }

    if (hints.includes(prevLetter)) {
      return;
    }

    const removals = prevLetter ? { [prevLetter]: null } : {};
    const newGuesses = { ...guesses, ...removals, [letter]: guess };
    const newMistakes = mistakes.filter(
      mistake => mistake !== letter && mistake !== prevLetter
    );

    if (this.checkWin(newGuesses)) {
      this.setState(
        {
          guesses: newGuesses,
          mistakes: newMistakes,
          isWinner: true
        },
        this.props.onMarkAsSolved
      );
      return;
    }

    this.setState(
      { guesses: newGuesses, mistakes: newMistakes },
      this.handleSelectNextLetter
    );
  };

  handleDelete = () => {
    const { hints } = this.state;
    const letter = this.getSelectedLetter();

    if (hints.includes(letter)) {
      this.handleSelectPreviousLetter();
      return;
    }

    this.setState(
      state => ({
        ...state,
        guesses: {
          ...state.guesses,
          [letter]: null
        },
        mistakes: state.mistakes.filter(mistake => mistake !== letter)
      }),
      this.handleSelectPreviousLetter
    );
  };

  handlePlayAgain = () => {
    this.setState(this.getInitialState(), this.props.onGetNewQuote);
  };

  handleClearGuesses = () => {
    this.setState(state => ({
      ...state,
      guesses: pick(state.guesses, state.hints),
      mistakes: [],
      sidebarOpen: false
    }));
  };

  handleShowMistakes = () => {
    const { cipher, guesses } = this.state;

    const mistakes = keys(guesses).filter(letter => {
      const guess = guesses[letter];
      return cipher[guess] && cipher[guess] !== letter;
    });

    this.setState({ mistakes, sidebarOpen: false });
  };

  handleRevealLetter = () => {
    const { cipher, guesses } = this.state;

    const hintLetter = this.getSelectedLetter();
    const answer = findKey(cipher, letter => letter === hintLetter);
    const existingLetter = findKey(guesses, letter => letter === answer);
    const removals = existingLetter ? { [existingLetter]: null } : {};

    this.setState(state => ({
      ...state,
      guesses: { ...state.guesses, ...removals, [hintLetter]: answer },
      sidebarOpen: false,
      hints: state.hints.concat([hintLetter]),
      mistakes: state.mistakes.filter(letter => letter !== hintLetter)
    }));
  };

  handleRevealAnswer = () => {
    const { cipher } = this.state;
    const correctAnswers = uniq(
      this.getLetters().map(({ letter }) => letter)
    ).reduce(
      (guesses, letter) => ({
        ...guesses,
        [letter]: findKey(cipher, l => l === letter)
      }),
      {}
    );

    this.setState(
      {
        guesses: correctAnswers,
        mistakes: [],
        isWinner: true,
        sidebarOpen: false
      },
      this.props.onMarkAsSolved
    );
  };

  handleToggleShowSolvedQuotes = () => {
    this.setState(state => ({
      ...state,
      showSolved: !state.showSolved,
      sidebarOpen: false
    }));
  };

  handleSetSidebarOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  handleToggleSidebar = () => {
    this.setState(state => ({ ...state, sidebarOpen: !state.sidebarOpen }));
  };

  render() {
    const { currentQuote, solvedQuotes } = this.props;
    const {
      isMobile,
      cipher,
      guesses,
      hints,
      mistakes,
      selectedId,
      isWinner,
      sidebarOpen,
      showSolved
    } = this.state;
    const enableSidebar = !isWinner && !showSolved;

    return (
      <Sidebar
        sidebar={
          <SidebarContent
            isDesktop={!isMobile}
            onClearGuesses={this.handleClearGuesses}
            onShowMistakes={this.handleShowMistakes}
            onRevealLetter={this.handleRevealLetter}
            onRevealAnswer={this.handleRevealAnswer}
            onToggleShowSolvedQuotes={this.handleToggleShowSolvedQuotes}
          />
        }
        onSetOpen={this.handleSetSidebarOpen}
        open={sidebarOpen}
        pullRight={!isMobile}
        touchHandleWidth={enableSidebar ? 20 : 0}
        shadow={enableSidebar}
      >
        {showSolved ? (
          <Solved quotes={solvedQuotes} onGoBack={this.handleToggleShowSolvedQuotes} />
        ) : (
          <Cryptogram
            isMobile={isMobile}
            quote={currentQuote}
            characters={this.getCharacters()}
            cipher={cipher}
            guesses={guesses}
            hints={hints}
            mistakes={mistakes}
            selectedId={selectedId}
            isWinner={isWinner}
            sidebarOpen={sidebarOpen}
            onDelete={this.handleDelete}
            onGuess={this.handleGuess}
            onPlayAgain={this.handlePlayAgain}
            onSelectLetter={this.handleSelectLetter}
            onSelectNextLetter={this.handleSelectNextLetter}
            onSelectPreviousLetter={this.handleSelectPreviousLetter}
            onSelectDoubleNextLetter={this.handleSelectNextOpenLetter}
            onSelectDoublePreviousLetter={this.handleSelectPreviousOpenLetter}
            onSetSidebarOpen={this.handleSetSidebarOpen}
            onToggleSidebar={this.handleToggleSidebar}
          />
        )}
      </Sidebar>
    );
  }
}

export default App;
