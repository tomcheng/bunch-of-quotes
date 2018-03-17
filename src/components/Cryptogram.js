import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import findIndex from "lodash/findIndex";
import findKey from "lodash/findKey";
import keys from "lodash/keys";
import pick from "lodash/pick";
import uniq from "lodash/uniq";
import AnimateHeight from "react-animate-height-auto";
import Sidebar from "react-sidebar";
import { generateCipher, applyCipher } from "../utils/cipher";
import { simpleMemoize } from "../utils/functionUtils";
import { alphabet } from "../utils/constants";
import SidebarContent from "./SidebarContent";
import FadeIn from "./FadeIn";
import Letters from "./Letters";
import Attribution from "./Attribution";
import Keyboard from "./Keyboard";

const MOBILE_SIZE = 1024;

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  line-height: 22px;
`;

const MainContent = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  padding: 20px;
  max-width: 1024px;
`;

const PlayAgainContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 0;
`;

const PlayAgainButton = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 0 15px;
  border-radius: 2px;
  font-weight: bold;
  background-color: #444;
  color: #fff;
  cursor: pointer;
  user-select: none;
  height: 54px;
  display: flex;
  align-items: center;
`;

const Options = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
  color: ${props => (props.sidebarOpen ? "#fff" : "#444")};
  z-index: 1000000;
`;

const getInitialState = () => ({
  cipher: generateCipher(),
  isMobile: window.innerWidth <= MOBILE_SIZE,
  guesses: {},
  selectedId: 1,
  isWinner: false,
  sidebarOpen: false,
  hints: [],
  mistakes: []
});

class Cryptogram extends Component {
  static propTypes = {
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
    context: PropTypes.string,
    occupation: PropTypes.string,
    time: PropTypes.string
  };

  state = getInitialState();

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quote !== this.props.quote) {
      this.setState(getInitialState());
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < MOBILE_SIZE });
  };

  getCharacters = simpleMemoize(
    (quote = this.props.quote, cipher = this.state.cipher) =>
      applyCipher(quote, cipher)
        .split("")
        .map((letter, index) => ({
          id: alphabet.includes(letter) ? index + 1 : null,
          letter
        }))
  );

  getLetters = () => this.getCharacters().filter(c => c.id !== null);

  getSelectedLetter = () => {
    const { selectedId } = this.state;

    const character = this.getCharacters().find(c => c.id === selectedId);

    return character ? character.letter : null;
  };

  getUniqueLetters = () => uniq(this.getLetters().map(({ letter }) => letter));

  handleKeyDown = evt => {
    if (alphabet.includes(evt.key.toUpperCase())) {
      this.handleTapLetter(evt.key.toUpperCase());
    } else if (evt.key === "Backspace") {
      this.handleTapDelete();
    } else if (evt.key === "ArrowLeft") {
      if (evt.metaKey) {
        this.selectPreviousWord();
      } else {
        this.selectPreviousLetter();
      }
    } else if (evt.key === "ArrowRight") {
      if (evt.metaKey) {
        this.selectNextWord();
      } else {
        this.selectNextLetter();
      }
    } else if (evt.key === "Tab") {
      evt.preventDefault();
      if (evt.shiftKey) {
        this.selectPreviousOpenLetter();
      } else {
        this.selectNextOpenLetter();
      }
    }
  };

  checkWin = guesses => {
    const { cipher } = this.state;
    const characters = this.getCharacters();

    return (
      characters.filter(c => !!c.id).every(c => !!guesses[c.letter]) &&
      keys(guesses).every(key => {
        const guess = guesses[key];
        return cipher[guess] === key;
      })
    );
  };

  selectLetter = id => {
    this.setState({ selectedId: id });
  };

  handleTapLetter = guess => {
    const { guesses, mistakes, hints } = this.state;

    const letter = this.getSelectedLetter();
    const prevLetter = findKey(guesses, l => l === guess);

    if (hints.includes(prevLetter) || hints.includes(letter)) {
      return;
    }

    const removals = prevLetter ? { [prevLetter]: null } : {};
    const newGuesses = { ...guesses, ...removals, [letter]: guess };
    const newMistakes = mistakes.filter(
      mistake => mistake !== letter && mistake !== prevLetter
    );

    if (this.checkWin(newGuesses)) {
      this.setState({
        guesses: newGuesses,
        mistakes: newMistakes,
        selectedId: null,
        isWinner: true
      });
      return;
    }

    this.setState(
      { guesses: newGuesses, mistakes: newMistakes },
      this.selectNextLetter
    );
  };

  handleTapDelete = () => {
    const { hints } = this.state;
    const letter = this.getSelectedLetter();

    if (hints.includes(letter)) {
      this.selectPreviousLetter();
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
      this.selectPreviousLetter
    );
  };

  selectNextLetter = () => {
    const { selectedId } = this.state;

    const letters = this.getLetters();
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

  selectPreviousLetter = () => {
    const { selectedId } = this.state;

    const letters = this.getLetters().reverse();
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

  selectNextOpenLetter = () => {
    const { selectedId, guesses } = this.state;
    const openLetters = this.getLetters().filter(
      ({ letter, id }) => !guesses[letter] || selectedId === id
    );
    const selectedIndex = findIndex(
      openLetters,
      letter => letter.id === selectedId
    );

    this.selectLetter(
      (selectedIndex === openLetters.length - 1
        ? openLetters[0]
        : openLetters[selectedIndex + 1]
      ).id
    );
  };

  selectPreviousOpenLetter = () => {
    const { selectedId, guesses } = this.state;
    const openLetters = this.getLetters()
      .filter(({ letter, id }) => !guesses[letter] || selectedId === id)
      .reverse();
    const selectedIndex = findIndex(
      openLetters,
      letter => letter.id === selectedId
    );

    this.selectLetter(
      (selectedIndex === openLetters.length - 1
        ? openLetters[0]
        : openLetters[selectedIndex + 1]
      ).id
    );
  };

  selectNextWord = () => {
    const { selectedId } = this.state;

    const characters = this.getCharacters();
    const wordStarts = characters.filter(
      ({ id }, index) =>
        (!!id && (!characters[index - 1] || !characters[index - 1].id)) ||
        id === selectedId
    );
    const selectedIndex = findIndex(
      wordStarts,
      letter => letter.id === selectedId
    );

    this.selectLetter(
      (selectedIndex === wordStarts.length - 1
        ? wordStarts[0]
        : wordStarts[selectedIndex + 1]
      ).id
    );
  };

  selectPreviousWord = () => {
    const { selectedId } = this.state;

    const characters = this.getCharacters();
    const wordStarts = characters
      .filter(
        ({ id }, index) =>
          (!!id && (!characters[index - 1] || !characters[index - 1].id)) ||
          id === selectedId
      )
      .reverse();
    const selectedIndex = findIndex(
      wordStarts,
      letter => letter.id === selectedId
    );

    this.selectLetter(
      (selectedIndex === wordStarts.length - 1
        ? wordStarts[0]
        : wordStarts[selectedIndex + 1]
      ).id
    );
  };

  handleSetOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  handleToggleOpen = () => {
    this.setState(state => ({ ...state, sidebarOpen: !state.sidebarOpen }));
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
    const { guesses, cipher } = this.state;

    const mistakes = keys(guesses).filter(letter => {
      const guess = guesses[letter];
      return cipher[guess] && cipher[guess] !== letter;
    });

    this.setState({ mistakes, sidebarOpen: false });
  };

  handleRevealLetter = () => {
    const { cipher } = this.state;

    const hintLetter = this.getSelectedLetter();
    const answer = findKey(cipher, letter => letter === hintLetter);

    this.setState(state => ({
      ...state,
      guesses: { ...state.guesses, [hintLetter]: answer },
      sidebarOpen: false,
      hints: state.hints.concat([hintLetter]),
      mistakes: state.mistakes.filter(letter => letter !== hintLetter)
    }));
  };

  handleRevealAnswer = () => {
    const { cipher } = this.state;
    const correctAnswers = this.getUniqueLetters().reduce(
      (guesses, letter) => ({
        ...guesses,
        [letter]: findKey(cipher, l => l === letter)
      }),
      {}
    );

    this.setState({
      guesses: correctAnswers,
      mistakes: [],
      selectedId: null,
      isWinner: true,
      sidebarOpen: false
    });
  };

  render() {
    const { name, context, occupation, time, onPlayAgain } = this.props;
    const {
      guesses,
      isMobile,
      selectedId,
      isWinner,
      sidebarOpen,
      hints,
      mistakes
    } = this.state;
    const characters = this.getCharacters();
    const selectedLetter = this.getSelectedLetter();

    return (
      <Sidebar
        sidebar={
          <SidebarContent
            isDesktop={!isMobile}
            onClearGuesses={this.handleClearGuesses}
            onShowMistakes={this.handleShowMistakes}
            onRevealLetter={this.handleRevealLetter}
            onRevealAnswer={this.handleRevealAnswer}
          />
        }
        onSetOpen={this.handleSetOpen}
        open={sidebarOpen}
        touchHandleWidth={isWinner ? 0 : 20}
        pullRight={!isMobile}
      >
        <Container>
          <MainContent>
            <Letters
              letters={characters}
              selectedId={selectedId}
              selectedLetter={selectedLetter}
              guesses={guesses}
              hints={hints}
              mistakes={mistakes}
              isWinner={isWinner}
              onSelect={this.selectLetter}
            />
            {isWinner && (
              <FadeIn delay={1000}>
                {({ fadeInStyle }) => (
                  <Attribution
                    containerStyle={{ ...fadeInStyle, marginTop: 15 }}
                    name={name}
                    context={context}
                    occupation={occupation}
                    time={time}
                  />
                )}
              </FadeIn>
            )}
            {isWinner && (
              <FadeIn delay={2000}>
                {({ fadeInStyle }) => (
                  <PlayAgainContainer style={fadeInStyle}>
                    <PlayAgainButton onClick={onPlayAgain}>
                      Play Again
                    </PlayAgainButton>
                  </PlayAgainContainer>
                )}
              </FadeIn>
            )}
          </MainContent>

          {isMobile && (
            <AnimateHeight isExpanded={!isWinner} duration={300}>
              <Keyboard
                onTapPrevious={this.selectPreviousLetter}
                onTapNext={this.selectNextLetter}
                onTapLetter={this.handleTapLetter}
                onTapDelete={this.handleTapDelete}
              />
            </AnimateHeight>
          )}

          {!isMobile && (
            <Options onClick={this.handleToggleOpen} sidebarOpen={sidebarOpen}>
              <span style={{ display: sidebarOpen ? "none" : "inline" }}>
                <i className="fa fa-cog" />
              </span>
              <span style={{ display: sidebarOpen ? "inline-block" : "none" }}>
                <i className="fa fa-times" />
              </span>
            </Options>
          )}
        </Container>
      </Sidebar>
    );
  }
}

export default Cryptogram;
