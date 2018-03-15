import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Letter from "./Letter";

const Container = styled.div`
  display: inline-flex;
  margin-right: 16px;
`;

const Word = ({ letters, selectedId, selectedLetter, letterRef, guesses, onSelect }) => (
  <Container>
    {letters.map(({ id, letter }, index) => (
      <Letter
        key={index}
        id={id}
        isSelected={id === selectedId}
        isLetter={id !== null}
        letter={letter}
        guess={guesses[letter] || " "}
        onSelect={onSelect}
        letterSelected={letter === selectedLetter}
        letterRef={letterRef}
      />
    ))}
  </Container>
);

Word.propTypes = {
  guesses: PropTypes.objectOf(PropTypes.string).isRequired,
  letters: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      id: PropTypes.number
    })
  ).isRequired,
  letterRef: PropTypes.func.isRequired,
  selectedId: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedLetter: PropTypes.string
};

export default Word;
