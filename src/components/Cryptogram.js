import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import findIndex from "lodash/findIndex";
import findKey from "lodash/findKey";
import { generateCipher, applyCipher } from "../utils/cipher";
import { alphabet } from "../utils/constants";
import Letters from "./Letters";
import Keyboard from "./Keyboard";

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
      selectedId: this.characters.filter(c => !!c.id)[0].id
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
    this.setState({ selectedId: id });
  };

  handleTapLetter = guess => {
    const { guesses, selectedId } = this.state;

    const letter = this.characters.find(c => c.id === selectedId).letter;
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
      this.selectNextLetter
    );
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
    const { guesses, isMobile, selectedId } = this.state;
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
          />
        </LettersContainer>
        {isMobile && (
          <Keyboard
            onTapPrevious={this.selectPreviousLetter}
            onTapNext={this.selectNextLetter}
            onTapLetter={this.handleTapLetter}
            onTapDelete={this.handleTapDelete}
          />
        )}
      </Container>
    );
  }
}

export default Cryptogram;
