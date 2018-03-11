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

const StyledInput = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: block;
  width: 16px;
  height: 20px;
  padding: 0;
  margin-right: 1px;
  text-align: center;
`;

const EncryptedLetter = styled.div`
  opacity: 0.4;
`;

const Letter = ({ encrypted, guess, onGuess }) => {
  const isLetter = alphabet.indexOf(encrypted) > -1;

  if (!isLetter) {
    return <span>{encrypted}</span>;
  }

  return (
    <Container>
      <StyledInput
        type="text"
        value={guess}
        onChange={evt => {
          const { value } = evt.target;
          const guess =
            value.length === 0 ? "" : value.split("")[value.length - 1];

          onGuess({ encrypted, guess });
        }}
      />
      <EncryptedLetter>{encrypted}</EncryptedLetter>
    </Container>
  );
};

Letter.propTypes = {
  encrypted: PropTypes.string.isRequired,
  onGuess: PropTypes.func.isRequired,
  guess: PropTypes.string
};

export default Letter;
