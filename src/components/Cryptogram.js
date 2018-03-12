import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import shuffle from "lodash/shuffle";
import { alphabet } from "../utils/constants";
import Word from "./Word";

const letters = alphabet.split("");

const generateCipher = () => {
  const shuffledLetters = shuffle(letters);
  return letters.reduce(
    (cipher, letter, index) => ({
      ...cipher,
      [letter]: shuffledLetters[index]
    }),
    {}
  );
};

const applyCipher = (text, cipher) =>
  text
    .toUpperCase()
    .split("")
    .map(letter => cipher[letter] || letter)
    .join("");

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const HiddenInput = styled.input`
  position: fixed;
  top: -1000px;
  left: -1000px;
`;

class Cryptogram extends Component {
  static propTypes = {
    quote: PropTypes.shape({
      quote: PropTypes.string.isRequired
    }).isRequired
  };

  constructor(props) {
    super();

    const cipher = generateCipher();
    const encrypted = applyCipher(props.quote.quote, cipher);

    this.state = {
      cipher,
      encrypted,
      guesses: {},
      selectedLetter: null,
      letterIndex: null,
      wordIndex: null
    };
  }

  inputEl = null;

  handleGuess = ({ encrypted, guess }) => {
    this.setState(state => ({
      ...state,
      guesses: {
        ...state.guesses,
        [encrypted]: guess.toUpperCase()
      }
    }));
  };

  handleSelectLetter = arg => {
    const { letter, letterIndex, wordIndex } = arg;

    this.setState({ selectedLetter: letter, letterIndex, wordIndex }, () => {
      this.inputEl.focus();
    });
  };

  handleChange = evt => {
    const { value } = evt.target;

    this.setState(state => ({
      ...state,
      guesses: {
        ...state.guesses,
        [state.selectedLetter]: value.toUpperCase()
      }
    }));
  };

  render() {
    const { encrypted, guesses, selectedLetter, wordIndex, letterIndex } = this.state;
    const encryptedWords = encrypted.split(" ");

    return (
      <Container>
        {encryptedWords.map((word, index) => (
          <Word
            key={index}
            encrypted={word}
            guesses={guesses}
            selectedLetter={selectedLetter}
            letterIndex={wordIndex === index ? letterIndex : null}
            onGuess={this.handleGuess}
            onSelect={arg => {
              this.handleSelectLetter({ ...arg, wordIndex: index });
            }}
          />
        ))}
        <HiddenInput
          innerRef={el => {
            this.inputEl = el;
          }}
          type="text"
          value=""
          onChange={this.handleChange}
        />
      </Container>
    );
  }
}

export default Cryptogram;
