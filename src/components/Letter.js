import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { alphabet } from "../utils/constants";

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;

const GuessedLetter = styled.div`
  background-color: ${props => props.focused ? "rgba(255,0,0,0.1)" : "transparent"};
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);
  display: block;
  width: 16px;
  height: 20px;
  padding: 0;
  margin: 0 1px 2px;
  text-align: center;
  line-height: 20px;
  font-size: 16px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
`;

const EncryptedLetter = styled.div`
  opacity: ${props => (props.letterSelected ? 1 : 0.6)};
  color: ${props => (props.letterSelected ? "red" : "inherit")};
  font-size: 14px;
  font-family: Courier, mono-space;
`;

const Letter = ({ encrypted, guess, letterSelected, focused, onGuess, onSelect }) => {
  const isLetter = alphabet.indexOf(encrypted) > -1;

  if (!isLetter) {
    return <span>{encrypted}</span>;
  }

  return (
    <Container
      onClick={() => {
        onSelect({ letter: encrypted });
      }}
    >
      <GuessedLetter focused={focused}>{guess || " "}</GuessedLetter>
      <EncryptedLetter letterSelected={letterSelected}>{encrypted}</EncryptedLetter>
    </Container>
  );
};

Letter.propTypes = {
  encrypted: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  letterSelected: PropTypes.bool.isRequired,
  onGuess: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  guess: PropTypes.string
};

export default Letter;
