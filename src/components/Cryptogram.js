import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import findIndex from "lodash/findIndex";
import findKey from "lodash/findKey";
import keys from "lodash/keys";
import AnimateHeight from "react-animate-height-auto";
import { generateCipher, applyCipher } from "../utils/cipher";
import { alphabet } from "../utils/constants";
import Letters from "./Letters";
import Keyboard from "./Keyboard";

const MOBILE_SIZE = 420;

const removeWidows = str => str.replace(/ (\S{0,5})$/g, "\u00A0$1");
const formatTime = str => str.replace(/-/g, "\u200A\u2013\u200A");

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LettersContainer = styled.div`
  position: relative;
  flex-shrink: 1;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  padding: 20px;
`;

const Attribution = styled.div`
  flex-basis: 100%;
  margin-top: 15px;
  text-align: right;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #444;
  opacity: ${props => (props.isWinner ? 1 : 0)};
  transition: opacity 0.3s ease-in-out 1.0s;
`;

const StyledOccupation = styled.div`
  opacity: 0.6;
  font-size: 13px;
`;

const StyledTime = styled.span`
  white-space: nowrap;
`;

class Cryptogram extends Component {
  static propTypes = {
    quote: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    context: PropTypes.string,
    occupation: PropTypes.string,
    time: PropTypes.string
  };

  constructor(props) {
    super();

    this.cipher = generateCipher();
    this.characters = applyCipher(props.quote, this.cipher)
      .split("")
      .map((letter, index) => ({
        id: alphabet.indexOf(letter) > -1 ? index + 1 : null,
        letter
      }));

    this.letterEls = {};

    this.state = {
      isMobile: window.innerWidth < MOBILE_SIZE,
      guesses: {},
      selectedId: this.characters.filter(c => !!c.id)[0].id,
      isWinner: false
    };
  }

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.handleResize();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", () => {
      this.handleResize();
    });
  }

  handleResize() {
    this.setState({ isMobile: window.innerWidth < MOBILE_SIZE });
  }

  checkWin = guesses =>
    this.characters.filter(c => !!c.id).every(c => !!guesses[c.letter]) &&
    keys(guesses).every(key => {
      const guess = guesses[key];
      return this.cipher[guess] === key;
    });

  selectLetter = id => {
    this.setState({ selectedId: id });
  };

  handleTapLetter = guess => {
    const { guesses, selectedId } = this.state;

    const letter = this.characters.find(c => c.id === selectedId).letter;
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
    const { selectedId } = this.state;

    const letter = this.characters.find(c => c.id === selectedId).letter;

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
    const { selectedId } = this.state;
    const letters = this.characters.filter(c => c.id !== null);
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
    const letters = this.characters.filter(c => c.id !== null).reverse();
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

  render() {
    const { name, context, occupation, time } = this.props;
    const { guesses, isMobile, selectedId, isWinner } = this.state;
    const selectedLetter = this.characters.find(c => c.id === selectedId);

    return (
      <Container>
        <LettersContainer>
          <Letters
            letters={this.characters}
            selectedId={selectedId}
            selectedLetter={selectedLetter ? selectedLetter.letter : null}
            guesses={guesses}
            letterRef={({ el, id }) => {
              this.letterEls[id] = el;
            }}
            onSelect={this.selectLetter}
            isWinner={isWinner}
          />
          <Attribution isWinner={isWinner}>
            <div>
              {name}
              {context && `, ${context}`}
            </div>
            {(occupation || time) && (
              <StyledOccupation>
                {removeWidows(occupation)}
                {!!occupation && !!time && ", "}
                {time && <StyledTime>{formatTime(time)}</StyledTime>}
              </StyledOccupation>
            )}
          </Attribution>
        </LettersContainer>

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
    );
  }
}

export default Cryptogram;
