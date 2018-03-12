import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Letter from "./Letter";

const Container = styled.div`
  display: inline-flex;
  margin-right: 16px;
`;

const Word = ({ encrypted, guesses, selectedLetter, letterIndex, onSelect }) => (
  <Container>
    {encrypted
      .split("")
      .map((letter, index) => (
        <Letter
          key={index}
          encrypted={letter}
          guess={guesses[letter] || ""}
          onSelect={arg => onSelect({ ...arg, letterIndex: index })}
          focused={letterIndex === index}
          letterSelected={selectedLetter === letter}
        />
      ))}
  </Container>
);

Word.propTypes = {
  encrypted: PropTypes.string.isRequired,
  guesses: PropTypes.objectOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
  letterIndex: PropTypes.number,
  selectedLetter: PropTypes.string
};

export default Word;
