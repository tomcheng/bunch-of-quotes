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
    const { letter, letterIndex, wordIndex } = arg;

    this.setState({ selectedLetter: letter, letterIndex, wordIndex }, () => {
      this.inputEl.focus();
    });
  };

  handleChange = evt => {
    const guess = evt.target.value.toUpperCase();

    this.setState(state => ({
      ...state,
      guesses: {
        ...state.guesses,
        [state.selectedLetter]: guess
      }
    }));
  };

  render() {
    const { text } = this.props;
    const {
      cipher,
      guesses,
      selectedLetter,
      wordIndex,
      letterIndex
    } = this.state;
    const encrypted = applyCipher(text, cipher);
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
