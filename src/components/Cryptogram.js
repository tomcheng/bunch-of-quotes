import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import findIndex from "lodash/findIndex";
import findKey from "lodash/findKey";
import { generateCipher, applyCipher } from "../utils/cipher";
import { alphabet } from "../utils/constants";
import Letters from "./Letters";

const MOBILE_SIZE = 420;

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

const Arrows = styled.div`
  flex-shrink: 0;
  display: flex;
  height: 48px;
  align-items: stretch;
`;

const Arrow = styled.div`
  flex: 1 1 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  &:not(:first-child) {
    border-left: 0;
  }
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  user-select: none;
`;

class Cryptogram extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  constructor(props) {
    super();

    this.cipher = generateCipher();
    this.characters = applyCipher(props.text, this.cipher)
      .split("")
      .map((letter, index) => ({
        id: alphabet.indexOf(letter) > -1 ? index + 1 : null,
        letter
      }));

    this.letterEls = {};

    this.state = {
      isMobile: window.innerWidth < MOBILE_SIZE,
      guesses: {},
      selectedLetter: null
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

  selectLetter = id => {
    this.letterEls[id].focus();
  };

  handleFocus = id => {
    const selectedLetter = this.characters.find(c => c.id === id);
    this.setState({ selectedLetter: selectedLetter && selectedLetter.letter });
  };

  handleGuess = ({ id, letter, guess }) => {
    const { guesses } = this.state;

    const prevLetter = findKey(guesses, l => l === guess);
    const removals = prevLetter ? { [prevLetter]: null } : {};

    this.setState(
      state => ({
        ...state,
        guesses: {
          ...state.guesses,
          ...removals,
          [letter]: guess
        }
      }),
      () => {
        if (guess === "") {
          this.selectPreviousLetter({ id });
        } else {
          this.selectNextLetter({ id });
        }
      }
    );
  };

  selectNextLetter = ({ id }) => {
    const letters = this.characters.filter(c => c.id !== null);
    const selectedIndex = findIndex(
      letters,
      letter => letter.id === id
    );

    this.selectLetter(
      (selectedIndex === letters.length - 1
        ? letters[0]
        : letters[selectedIndex + 1]
      ).id
    );
  };

  selectPreviousLetter = ({ id }) => {
    const letters = this.characters.filter(c => c.id !== null).reverse();
    const selectedIndex = findIndex(
      letters,
      letter => letter.id === id
    );

    this.selectLetter(
      (selectedIndex === letters.length - 1
        ? letters[0]
        : letters[selectedIndex + 1]
      ).id
    );
  };

  render() {
    const { guesses, isMobile, selectedLetter } = this.state;

    const lettersWithState = this.characters.map(
      ({ letter, id, ...other }) => ({
        ...other,
        letter,
        id,
        letterSelected: letter === selectedLetter,
        guess: guesses[letter] || ""
      })
    );

    return (
      <Container>
        <LettersContainer>
          <Letters
            letters={lettersWithState}
            onSelect={this.selectLetter}
            onGuess={this.handleGuess}
            onFocus={this.handleFocus}
            letterRef={({ el, id }) => {
              this.letterEls[id] = el;
            }}
          />
        </LettersContainer>
        {isMobile && (
          <Arrows>
            <Arrow
              onClick={evt => {
                evt.preventDefault();
                this.selectPreviousLetter();
              }}
            >
              ←
            </Arrow>
            <Arrow
              onClick={evt => {
                evt.preventDefault();
                this.selectNextLetter();
              }}
            >
              →
            </Arrow>
          </Arrows>
        )}
      </Container>
    );
  }
}

export default Cryptogram;
