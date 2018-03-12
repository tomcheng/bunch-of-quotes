import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { generateCipher, applyCipher } from "../utils/cipher";
import Word from "./Word";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const HiddenInput = styled.input`
  position: fixed;
  top: -1000px;
  left: -1000px;
  opacity: 0;
`;

class Cryptogram extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  };

  state = {
    cipher: generateCipher(),
    guesses: {},
    selectedLetter: null,
    letterIndex: null,
    wordIndex: null
  };

  inputEl = null;

  handleSelectLetter = arg => {
    const { letterIndex, wordIndex } = arg;

    this.setState({ letterIndex, wordIndex }, () => {
      this.inputEl.focus();
    });
  };

  handleChange = evt => {
    const guess = evt.target.value.toUpperCase();
    const selectedLetter = this.getSelectedLetter();

    this.setState(state => ({
      ...state,
      guesses: {
        ...state.guesses,
        [selectedLetter]: guess
      }
    }));
  };

  getSelectedLetter = () => {
    const { text } = this.props;
    const { cipher, wordIndex, letterIndex } = this.state;

    const words = applyCipher(text, cipher).split(" ");

    return wordIndex !== null && letterIndex !== null ? words[wordIndex].charAt(letterIndex) : null;
  };

  getWords = () => {
    const { text } = this.props;
    const { cipher, guesses, wordIndex, letterIndex } = this.state;
    const selectedLetter = this.getSelectedLetter();

    return applyCipher(text, cipher).split(" ").map((word, wIndex) => ({
      letters: word.split("").map((letter, lIndex) => ({
        letter,
        guess: guesses[letter] || "",
        letterSelected: letter === selectedLetter,
        focused: wIndex === wordIndex && lIndex === letterIndex
      }))
    }));
  };

  render() {
    const words = this.getWords();

    return (
      <Container>
        {words.map(({ letters }, index) => (
          <Word
            key={index}
            letters={letters}
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
