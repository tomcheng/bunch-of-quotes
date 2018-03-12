import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Letter from "./Letter";

const Container = styled.div`
  display: inline-flex;
  margin-right: 16px;
`;

const Word = ({ letters, onSelect }) => (
  <Container>
    {letters.map(({ letter, guess, letterSelected, focused }, index) => (
      <Letter
        key={index}
        encrypted={letter}
        guess={guess}
        onSelect={arg => onSelect({ ...arg, letterIndex: index })}
        focused={focused}
        letterSelected={letterSelected}
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
      focused: PropTypes.bool.isRequired
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Word;
