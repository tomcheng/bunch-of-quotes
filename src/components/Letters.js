import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Letter from "./Letter";

const split = (arr, predicate) => {
  const newArr = [[]];

  arr.forEach(entry => {
    if (predicate(entry)) {
      newArr.push([]);
    } else {
      newArr[newArr.length - 1].push(entry);
    }
  });

  return newArr;
};

const Word = styled.div`
  display: inline-flex;
  margin-right: 16px;
`;

const Letters = ({ letters, selectedId, selectedLetter, guesses, letterRef, onSelect, isWinner }) => {
  const words = split(letters, l => l.letter === " ");

  return words.map((letters, wordIndex) => (
    <Word key={wordIndex}>
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
          isWinner={isWinner}
        />
      ))}
    </Word>
  ));
};

Letters.propTypes = {
  guesses: PropTypes.object.isRequired,
  isWinner: PropTypes.bool.isRequired,
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

export default Letters;
