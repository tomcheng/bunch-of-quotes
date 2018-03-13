import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import findIndex from "lodash/findIndex";
import { generateCipher, applyCipher } from "../utils/cipher";
import { alphabet } from "../utils/constants";
import Letters from "./Letters";

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

    this.cipher = generateCipher();
    this.characters = applyCipher(props.text, this.cipher)
      .split("")
      .map((letter, index) => ({
        id: alphabet.indexOf(letter) > -1 ? index + 1 : null,
        letter
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

    if (key === "Tab") {
      if (shiftKey) {
        this.selectPreviousOpenLetter();
      } else {
        this.selectNextOpenLetter();
      }
      return;
    }

    if (key === "ArrowRight") {
      this.selectNextLetter();
      return;
    }

    if (key === "ArrowLeft") {
      this.selectPreviousLetter();
      return
    }

    if (!alphabet.split("").includes(key.toUpperCase())) {
      return;
    }

    const guess = evt.key.toUpperCase();
    const selectedLetter = this.getSelectedLetter();

    this.setState(
      state => ({
        ...state,
        guesses: {
          ...state.guesses,
          [selectedLetter]: guess
        }
      }),
      this.selectNextOpenLetter
    );
  };

  handleBlur = () => {
    this.setState({ selectedLetterId: null });
  };

  selectNextLetter = () => {
    const { selectedLetterId } = this.state;

    const letters = this.characters.filter(c => c.id !== null);
    const selectedIndex = findIndex(
      letters,
      letter => letter.id === selectedLetterId
    );

    this.setState({
      selectedLetterId: (selectedIndex === letters.length - 1
        ? letters[0]
        : letters[selectedIndex + 1]
      ).id
    });
  };

  selectPreviousLetter = () => {
    const { selectedLetterId } = this.state;

    const letters = this.characters.filter(c => c.id !== null).reverse();
    const selectedIndex = findIndex(
      letters,
      letter => letter.id === selectedLetterId
    );

    this.setState({
      selectedLetterId: (selectedIndex === letters.length - 1
          ? letters[0]
          : letters[selectedIndex + 1]
      ).id
    });
  };

  selectNextOpenLetter = () => {
    const { selectedLetterId, guesses } = this.state;

    const letters = this.characters.filter(c => c.id !== null);
    const selectedIndex = findIndex(
      letters,
      letter => letter.id === selectedLetterId
    );
    const nextLetter = letters
      .slice(selectedIndex + 1)
      .concat(letters.slice(0, selectedIndex + 1))
      .find(letter => !guesses[letter.letter]);

    this.setState({
      selectedLetterId: nextLetter ? nextLetter.id : null
    });
  };

  selectPreviousOpenLetter = () => {
    const { selectedLetterId, guesses } = this.state;

    const letters = this.characters.filter(c => c.id !== null).reverse();
    const selectedIndex = findIndex(
      letters,
      letter => letter.id === selectedLetterId
    );
    const previousLetter = letters
      .slice(selectedIndex + 1)
      .concat(letters.slice(0, selectedIndex + 1))
      .find(letter => !guesses[letter.letter]);

    this.setState({
      selectedLetterId: previousLetter ? previousLetter.id : null
    });
  };

  getSelectedLetter = () => {
    const { selectedLetterId } = this.state;

    const selectedLetter = this.characters.find(c => c.id === selectedLetterId);

    return selectedLetter ? selectedLetter.letter : null;
  };

  render() {
    const { selectedLetterId, guesses } = this.state;

    const selectedLetter = this.getSelectedLetter();
    const lettersWithState = this.characters.map(
      ({ letter, id, ...other }) => ({
        ...other,
        letter,
        id,
        letterSelected: letter === selectedLetter,
        focused: id === selectedLetterId,
        guess: guesses[letter] || ""
      })
    );

    return (
      <Container>
        <Letters
          letters={lettersWithState}
          onSelect={this.handleSelectLetter}
        />
        <HiddenInput
          innerRef={el => {
            this.inputEl = el;
          }}
          type="text"
          value=""
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
        />
      </Container>
    );
  }
}

export default Cryptogram;
