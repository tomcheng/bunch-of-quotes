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
      guesses: {}
    };
  }

  handleGuess = ({ encrypted, guess }) => {
    this.setState(state => ({
      ...state,
      guesses: {
        ...state.guesses,
        [encrypted]: guess.toUpperCase()
      }
    }));
  };

  render() {
    const { encrypted, guesses } = this.state;
    const encryptedWords = encrypted.split(" ");

    return (
      <Container>
        {encryptedWords.map((word, index) => (
          <Word
            key={index}
            encrypted={word}
            guesses={guesses}
            onGuess={this.handleGuess}
          />
        ))}
      </Container>
    );
  }
}

export default Cryptogram;
