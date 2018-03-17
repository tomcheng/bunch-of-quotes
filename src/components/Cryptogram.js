import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import findIndex from "lodash/findIndex";
import findKey from "lodash/findKey";
import keys from "lodash/keys";
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
  padding: 10px 15px;
  border-radius: 2px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  background-color: #444;
  color: #fff;
  cursor: pointer;
  user-select: none;
`;

class Cryptogram extends Component {
  static propTypes = {
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
    context: PropTypes.string,
    occupation: PropTypes.string,
    time: PropTypes.string
  };

  state = {
    cipher: generateCipher(),
    isMobile: window.innerWidth <= MOBILE_SIZE,
    guesses: {},
    selectedId: 1,
    isWinner: false,
    sidebarOpen: false
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quote !== this.props.quote) {
      this.setState({
        cipher: generateCipher(),
        guesses: {},
        selectedId: 1,
        isWinner: false
      });
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
    const { quote } = this.props;
    const { guesses, selectedId, cipher } = this.state;

    const characters = this.getCharacters(quote, cipher);
    const letter = characters.find(c => c.id === selectedId).letter;
    const prevLetter = findKey(guesses, l => l === guess);
    const removals = prevLetter ? { [prevLetter]: null } : {};
    const newGuesses = { ...guesses, ...removals, [letter]: guess };

    if (this.checkWin(newGuesses)) {
      this.setState({ guesses: newGuesses, selectedId: null, isWinner: true });
      return;
    }

    this.setState({ guesses: newGuesses }, this.selectNextLetter);
  };

  handleTapDelete = () => {
    const { quote } = this.props;
    const { selectedId, cipher } = this.state;
    const letter = this.getCharacters(quote, cipher).find(
      c => c.id === selectedId
    ).letter;

    this.setState(
      state => ({
        ...state,
        guesses: {
          ...state.guesses,
          [letter]: null
        }
      }),
      this.selectPreviousLetter
    );
  };

  selectNextLetter = () => {
    const { quote } = this.props;
    const { selectedId, cipher } = this.state;

    const letters = this.getCharacters(quote, cipher).filter(
      c => c.id !== null
    );
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
    const { quote } = this.props;
    const { selectedId, cipher } = this.state;

    const letters = this.getCharacters(quote, cipher)
      .filter(c => c.id !== null)
      .reverse();
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
    this.setState({ guesses: {}, sidebarOpen: false });
  };

  render() {
    const { quote, name, context, occupation, time, onPlayAgain } = this.props;
    const {
      cipher,
      guesses,
      isMobile,
      selectedId,
      isWinner,
      sidebarOpen
    } = this.state;
    const characters = this.getCharacters(quote, cipher);
    const selectedLetter = characters.find(c => c.id === selectedId);

    return (
      <Sidebar
        sidebar={<SidebarContent onClearGuesses={this.handleClearGuesses} />}
        onSetOpen={this.handleSetOpen}
        open={sidebarOpen}
      >
        <Container>
          <MainContent>
            <Letters
              letters={characters}
              selectedId={selectedId}
              selectedLetter={selectedLetter ? selectedLetter.letter : null}
              guesses={guesses}
              onSelect={this.selectLetter}
              isWinner={isWinner}
            />
            {isWinner && (
              <Attribution
                name={name}
                context={context}
                occupation={occupation}
                time={time}
              />
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
