import React from "react";
import PropTypes from "prop-types";
import Word from "./Word";

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

const Letters = ({ letters, selectedLetter, guesses, letterRef, onFocus, onGuess, onSelect }) => {
  const words = split(letters, l => l.letter === " ");

  return words.map((letters, index) => (
    <Word
      key={index}
      letters={letters}
      selectedLetter={selectedLetter}
      guesses={guesses}
      letterRef={letterRef}
      onFocus={onFocus}
      onGuess={onGuess}
      onSelect={onSelect}
    />
  ));
};

Letters.propTypes = {
  guesses: PropTypes.object.isRequired,
  letters: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      id: PropTypes.number
    })
  ).isRequired,
  letterRef: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onGuess: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedLetter: PropTypes.string
};

export default Letters;
