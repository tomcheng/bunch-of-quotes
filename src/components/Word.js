import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Letter from "./Letter";

const Container = styled.div``;

const Word = ({ encrypted, onGuess, guesses }) => (
  <Container>
    {encrypted
      .split("")
      .map((letter, index) => (
        <Letter
          key={index}
          encrypted={letter}
          guess={guesses[letter] || ""}
          onGuess={onGuess}
        />
      ))}
  </Container>
);

Word.propTypes = {
  encrypted: PropTypes.string.isRequired,
  guesses: PropTypes.objectOf(PropTypes.string).isRequired,
  onGuess: PropTypes.func.isRequired
};

export default Word;
