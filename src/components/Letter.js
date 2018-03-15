import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;
`;

const GuessedLetter = styled.div`
  background-color: ${props =>
    props.isSelected ? "red" : props.letterSelected ? "#eee" : "transparent"};
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
  opacity: 0.6;
  font-size: 14px;
  font-family: Courier, mono-space;
`;

const Letter = ({
  id,
  letter,
  guess,
  isSelected,
  letterSelected,
  isLetter,
  onSelect,
  letterRef
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
      <EncryptedLetter>{letter}</EncryptedLetter>
    </Container>
  );
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  isLetter: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  letterRef: PropTypes.func.isRequired,
  letterSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  id: PropTypes.number,
  guess: PropTypes.string
};

export default Letter;
