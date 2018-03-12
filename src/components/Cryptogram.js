import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flatMap from "lodash/flatMap";
import findIndex from "lodash/findIndex";
import { generateCipher, applyCipher } from "../utils/cipher";
import { simpleMemoize } from "../utils/functionUtils";
import { alphabet } from "../utils/constants";
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
    selectedLetterId: null
  };

  inputEl = null;

  handleSelectLetter = ({ id }) => {
    this.setState({ selectedLetterId: id }, () => {
      this.inputEl.focus();
    });
  };

  handleKeyDown = evt => {
    evt.preventDefault();
    const { key } = evt;

    const nextOpenId = this.getNextOpenId();

    if (key === "Tab") {
      this.setState({ selectedLetterId: nextOpenId });
      return;
    }

    if (!alphabet.split("").includes(key.toUpperCase())) {
      return;
    }

    const guess = evt.key.toUpperCase();
    const selectedLetter = this.getSelectedLetter();

    this.setState(state => ({
      ...state,
      guesses: {
        ...state.guesses,
        [selectedLetter]: guess
      }
    }));
  };

  getNextOpenId = () => {
    const { text } = this.props;
    const { selectedLetterId, cipher, guesses } = this.state;

    const words = this.getWords(text, cipher);
    const letters = flatMap(words, word => word.letters);
    const selectedIndex = findIndex(letters, letter => letter.id === selectedLetterId);
    const rearrangedLetters = letters.slice(selectedIndex + 1).concat(letters.slice(0, selectedIndex + 1));
    const nextOpenLetter = rearrangedLetters.find(letter => !guesses[letter.letter]);

    return nextOpenLetter ? nextOpenLetter.id : null;
  };

  getSelectedLetter = () => {
    const { text } = this.props;
    const { selectedLetterId, cipher } = this.state;

    const words = this.getWords(text, cipher);
    const letters = flatMap(words, word => word.letters);
    const selectedLetter = letters.find(
      letter => letter.id === selectedLetterId
    );

    return selectedLetter ? selectedLetter.letter : null;
  };

  getWords = simpleMemoize((text, cipher) => {
    let letterId = 1;

    return applyCipher(text, cipher)
      .split(" ")
      .map(word => ({
        letters: word.split("").map(letter => ({
          id: letterId++,
          letter
        }))
      }));
  });

  render() {
    const { text } = this.props;
    const { cipher, selectedLetterId, guesses } = this.state;
    const words = this.getWords(text, cipher);
    const selectedLetter = this.getSelectedLetter();
    const wordsWithState = words.map(word => ({
      ...word,
      letters: word.letters.map(letter => ({
        ...letter,
        letterSelected: letter.letter === selectedLetter,
        focused: letter.id === selectedLetterId,
        guess: guesses[letter.letter] || ""
      }))
    }));

    return (
      <Container>
        {wordsWithState.map(({ letters }, index) => (
          <Word
            key={index}
            letters={letters}
            onSelect={this.handleSelectLetter}
          />
        ))}
        <HiddenInput
          innerRef={el => {
            this.inputEl = el;
          }}
          type="text"
          value=""
          onKeyDown={this.handleKeyDown}
        />
      </Container>
    );
  }
}

export default Cryptogram;
