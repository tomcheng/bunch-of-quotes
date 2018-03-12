import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flatMap from "lodash/flatMap";
import findIndex from "lodash/findIndex";
import { generateCipher, applyCipher } from "../utils/cipher";
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

  constructor(props) {
    super();

    let letterId = 1;

    this.cipher = generateCipher();
    this.words = applyCipher(props.text, this.cipher)
      .split(" ")
      .map(word => ({
        letters: word.split("").map(letter => ({
          id: letterId++,
          letter
        }))
      }));

    this.inputEl = null;

    this.state = {
      guesses: {},
      selectedLetterId: null
    };
  }

  handleSelectLetter = ({ id }) => {
    this.setState({ selectedLetterId: id }, () => {
      this.inputEl.focus();
    });
  };

  handleKeyDown = evt => {
    evt.preventDefault();
    const { key, shiftKey } = evt;

    const nextOpenId = this.getNextOpenId();
    const getPreviousOpenId = this.getPreviousOpenId();

    if (key === "Tab") {
      if (shiftKey) {
        this.setState({ selectedLetterId: getPreviousOpenId });
      } else {
        this.setState({ selectedLetterId: nextOpenId });
      }
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
      },
      selectedLetterId: nextOpenId
    }));
  };

  getNextOpenId = () => {
    const { selectedLetterId, guesses } = this.state;

    const letters = flatMap(this.words, word => word.letters);
    const selectedIndex = findIndex(
      letters,
      letter => letter.id === selectedLetterId
    );
    const rearrangedLetters = letters
      .slice(selectedIndex + 1)
      .concat(letters.slice(0, selectedIndex + 1));
    const nextOpenLetter = rearrangedLetters.find(
      letter => !guesses[letter.letter]
    );

    return nextOpenLetter ? nextOpenLetter.id : null;
  };

  getPreviousOpenId = () => {
    const { selectedLetterId, guesses } = this.state;

    const reversedLetters = flatMap(this.words, word => word.letters).reverse();
    const selectedIndex = findIndex(
      reversedLetters,
      letter => letter.id === selectedLetterId
    );
    const rearrangedLetters = reversedLetters
      .slice(selectedIndex + 1)
      .concat(reversedLetters.slice(0, selectedIndex + 1));
    const previousOpenLetter = rearrangedLetters.find(
      letter => !guesses[letter.letter]
    );

    return previousOpenLetter ? previousOpenLetter.id : null;
  };

  getSelectedLetter = () => {
    const { selectedLetterId } = this.state;

    const letters = flatMap(this.words, word => word.letters);
    const selectedLetter = letters.find(
      letter => letter.id === selectedLetterId
    );

    return selectedLetter ? selectedLetter.letter : null;
  };

  render() {
    const { selectedLetterId, guesses } = this.state;

    const selectedLetter = this.getSelectedLetter();
    const wordsWithState = this.words.map(word => ({
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
