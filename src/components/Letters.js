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

const Letters = ({ letters, onSelect }) => {
  const words = split(letters, l => l.letter === " ");

  return words.map((letters, index) => (
    <Word key={index} letters={letters} onSelect={onSelect} />
  ));
};

Letters.propTypes = {
  letters: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      id: PropTypes.number
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default Letters;
