import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: inline-block;
`;

const Letter = ({ encrypted, guess, onGuess }) => (
  <Container>
    <div>
      <input
        type="text"
        value={guess}
        onChange={evt => {
          onGuess({ encrypted, guess: evt.target.value });
        }}
      />
    </div>
    <div>{encrypted}</div>
  </Container>
);

Letter.propTypes = {
  encrypted: PropTypes.string.isRequired,
  onGuess: PropTypes.func.isRequired,
  guess: PropTypes.string
};

export default Letter;
