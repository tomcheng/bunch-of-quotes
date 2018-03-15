import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0%, 100% {
    background-color: #444;
    color: #fff;
  }
  50% {
    background-color: transparent;
    color: #444;
  }
`;

const Container = styled.div`
  width: 16px;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  padding-bottom: 10px;
  margin: 0 1px;
  color: #444;
  user-select: none;
`;

const GuessedLetter = styled.div`
  background-color: ${props => (props.letterSelected ? "#eee" : "transparent")};
  border: 0;
  display: block;
  height: 20px;
  padding: 0;
  text-align: center;
  line-height: 22px;
  margin-bottom: 1px;
  font-size: 16px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  ${props =>
    props.isSelected ? `animation: 1.1s ${blink} step-end infinite` : ""};
`;

const EncryptedLetter = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.8);
  opacity: ${props => props.isWinner ? 0.3 : 0.8};
  transition: opacity 0.8s ease-out;
  font-size: 14px;
  font-family: Courier, mono-space;
  text-align: center;
`;

const Letter = ({
  id,
  letter,
  guess,
  isSelected,
  letterSelected,
  isLetter,
  onSelect,
  letterRef,
  isWinner
}) => {
  if (!isLetter) {
    return <span>{letter}</span>;
  }

  return (
    <Container
      onClick={() => {
        onSelect(id);
      }}
    >
      <GuessedLetter
        innerRef={el => {
          letterRef({ el, id });
        }}
        isSelected={isSelected}
        letterSelected={letterSelected}
      >
        {guess}
      </GuessedLetter>
      <EncryptedLetter isWinner={isWinner}>{letter}</EncryptedLetter>
    </Container>
  );
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  isLetter: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isWinner: PropTypes.bool.isRequired,
  letterRef: PropTypes.func.isRequired,
  letterSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  id: PropTypes.number,
  guess: PropTypes.string
};

export default Letter;
