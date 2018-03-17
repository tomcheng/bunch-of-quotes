import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import findIndex from "lodash/findIndex";
import findKey from "lodash/findKey";
import keys from "lodash/keys";
import uniq from "lodash/uniq";
import sample from "lodash/sample";
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

  getCharacters = simpleMemoize((quote, cipher) =>
    applyCipher(quote, cipher)
      .split("")
      .map((letter, index) => ({
        id: alphabet.includes(letter) ? index + 1 : null,
        letter
      }))
  );

  getLetters = () =>
    this.getCharacters(this.props.quote, this.state.cipher).filter(
      c => c.id !== null
    );

  getSelectedLetter = () => {
    const { quote } = this.props;
    const { selectedId, cipher } = this.state;

    const character = this.getCharacters(quote, cipher).find(
      c => c.id === selectedId
    );

    return character ? character.letter : null;
  };

  getUniqueLetters = () => uniq(this.getLetters().map(({ letter }) => letter));

  handleKeyDown = evt => {
    if (alphabet.includes(evt.key.toUpperCase())) {
      this.handleTapLetter(evt.key.toUpperCase());
    } else if (evt.key === "Backspace") {
      this.handleTapDelete();
    } else if (evt.key === "ArrowLeft") {
      this.selectPreviousLetter();
    } else if (evt.key === "ArrowRight") {
      this.selectNextLetter();
    }
  };

  checkWin = guesses => {
    const { quote } = this.props;
    const { cipher } = this.state;
    const characters = this.getCharacters(quote, cipher);

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

  handleSetOpen = open => {
    this.setState({ sidebarOpen: open });
  };

  handleClearGuesses = () => {
    this.setState({ guesses: {}, mistakes: [], sidebarOpen: false });
  };

  handleShowMistakes = () => {
    const { guesses, cipher } = this.state;

    const mistakes = keys(guesses).filter(letter => {
      const guess = guesses[letter];
      return cipher[guess] && cipher[guess] !== letter;
    });

    this.setState({ mistakes, sidebarOpen: false });
  };

  handleGetHint = () => {
    const { cipher, hints } = this.state;

    const hintLetter = sample(
      this.getUniqueLetters().filter(letter => !hints.includes(letter))
    );
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
    const { quote, name, context, occupation, time, onPlayAgain } = this.props;
    const {
      cipher,
      guesses,
      isMobile,
      selectedId,
      isWinner,
      sidebarOpen,
      hints,
      mistakes
    } = this.state;
    const characters = this.getCharacters(quote, cipher);
    const selectedLetter = this.getSelectedLetter();

    return (
      <Sidebar
        sidebar={
          <SidebarContent
            onClearGuesses={this.handleClearGuesses}
            onShowMistakes={this.handleShowMistakes}
            onGetHint={this.handleGetHint}
            onRevealAnswer={this.handleRevealAnswer}
          />
        }
        onSetOpen={this.handleSetOpen}
        open={sidebarOpen}
        touchHandleWidth={isWinner ? 0 : 20}
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
        </Container>
      </Sidebar>
    );
  }
}

export default Cryptogram;
