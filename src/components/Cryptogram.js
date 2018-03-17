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
import { alphabet } from "../utils/constants";
import SidebarContent from "./SidebarContent";
import FadeIn from "./FadeIn";
import Letters from "./Letters";
import Attribution from "./Attribution";
import Keyboard from "./Keyboard";

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

const KeyboardContainer = styled.div`
  align-self: stretch;
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
  guesses: {},
  selectedId: 1,
  isWinner: false,
  sidebarOpen: false,
  hints: [],
  mistakes: []
});

class Cryptogram extends Component {
  static propTypes = {
    cipher: PropTypes.objectOf(PropTypes.string).isRequired,
    characters: PropTypes.arrayOf(
      PropTypes.shape({
        letter: PropTypes.string.isRequired,
        id: PropTypes.number
      })
    ).isRequired,
    isMobile: PropTypes.bool.isRequired,
    quote: PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      context: PropTypes.string,
      occupation: PropTypes.string,
      time: PropTypes.string
    }).isRequired,
    onPlayAgain: PropTypes.func.isRequired
  };

  state = getInitialState();

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quote !== this.props.quote) {
      this.setState(getInitialState());
    }
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  getSelectedLetter = () => {
    const { characters } = this.props;
    const { selectedId } = this.state;
    const character = characters.find(c => c.id === selectedId);
    return character ? character.letter : null;
  };

  getLetters = () => this.props.characters.filter(c => c.id !== null);

  getUniqueLetters = () => uniq(this.getLetters().map(({ letter }) => letter));

  getOpenLettersWithSelected = () => {
    const { selectedId, guesses } = this.state;

    return this.getLetters().filter(
      ({ letter, id }) => !guesses[letter] || selectedId === id
    );
  };

  getWordStartsWithSelected = () => {
    const { characters } = this.props;
    const { selectedId } = this.state;
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

  selectNextLetter = () => {
    this.selectNext(this.getLetters());
  };

  selectPreviousLetter = () => {
    this.selectNext(this.getLetters().reverse());
  };

  selectNextOpenLetter = () => {
    this.selectNext(this.getOpenLettersWithSelected());
  };

  selectPreviousOpenLetter = () => {
    this.selectNext(this.getOpenLettersWithSelected().reverse());
  };

  selectNextWord = () => {
    this.selectNext(this.getWordStartsWithSelected());
  };

  selectPreviousWord = () => {
    this.selectNext(this.getWordStartsWithSelected().reverse());
  };

  checkWin = guesses => {
    const { characters, cipher } = this.props;

    return (
      characters.filter(c => !!c.id).every(c => !!guesses[c.letter]) &&
      keys(guesses).every(key => {
        const guess = guesses[key];
        return cipher[guess] === key;
      })
    );
  };

  handleKeyDown = evt => {
    if (alphabet.includes(evt.key.toUpperCase())) {
      this.handleTapLetter(evt.key.toUpperCase());
    } else if (evt.key === "Backspace") {
      this.handleTapDelete();
    } else if (evt.key === "ArrowLeft") {
      evt.preventDefault();
      if (evt.metaKey) {
        this.selectPreviousWord();
      } else {
        this.selectPreviousLetter();
      }
    } else if (evt.key === "ArrowRight") {
      evt.preventDefault();
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
    const { cipher } = this.props;
    const { guesses } = this.state;

    const mistakes = keys(guesses).filter(letter => {
      const guess = guesses[letter];
      return cipher[guess] && cipher[guess] !== letter;
    });

    this.setState({ mistakes, sidebarOpen: false });
  };

  handleRevealLetter = () => {
    const { cipher } = this.props;

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
    const { cipher } = this.props;
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
    const { characters, isMobile, onPlayAgain } = this.props;
    const { name, context, occupation, time } = this.props.quote;
    const {
      guesses,
      selectedId,
      isWinner,
      sidebarOpen,
      hints,
      mistakes
    } = this.state;
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
            <KeyboardContainer>
              <AnimateHeight isExpanded={!isWinner} duration={300}>
                <Keyboard
                  onTapPrevious={this.selectPreviousLetter}
                  onTapNext={this.selectNextLetter}
                  onTapLetter={this.handleTapLetter}
                  onTapDelete={this.handleTapDelete}
                />
              </AnimateHeight>
            </KeyboardContainer>
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
