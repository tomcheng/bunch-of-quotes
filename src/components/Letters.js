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

const Letters = ({ letters, selectedId, selectedLetter, guesses, letterRef, onSelect }) => {
  const words = split(letters, l => l.letter === " ");

  return words.map((letters, index) => (
    <Word
      key={index}
      letters={letters}
      selectedId={selectedId}
      selectedLetter={selectedLetter}
      guesses={guesses}
      letterRef={letterRef}
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
  selectedId: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedLetter: PropTypes.string
};

export default Letters;
