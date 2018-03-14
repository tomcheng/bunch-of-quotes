import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Letter from "./Letter";

const Container = styled.div`
  display: inline-flex;
  margin-right: 16px;
`;

const Word = ({ letters, onSelect, onFocus, onGuess, letterRef }) => (
  <Container>
    {letters.map(({ id, letter, guess, letterSelected }, index) => (
      <Letter
        key={index}
        id={id}
        isLetter={id !== null}
        letter={letter}
        guess={guess}
        onSelect={onSelect}
        onGuess={onGuess}
        onFocus={onFocus}
        letterSelected={letterSelected}
        letterRef={letterRef}
      />
    ))}
  </Container>
);

Word.propTypes = {
  letters: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      guess: PropTypes.string.isRequired,
      letterSelected: PropTypes.bool.isRequired,
      id: PropTypes.number
    })
  ).isRequired,
  letterRef: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onGuess: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Word;
