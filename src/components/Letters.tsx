import React from "react";
import styled from "styled-components";
import Letter from "./Letter";

type letterType = {
  letter: string;
  id: number;
};

const split = (
  arr: letterType[],
  predicate: (letterObj: letterType) => boolean
): letterType[][] => {
  const newArr: letterType[][] = [[]];

  arr.forEach((entry) => {
    if (predicate(entry)) {
      newArr.push([]);
    } else {
      newArr[newArr.length - 1].push(entry);
    }
  });

  return newArr;
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Word = styled.div`
  display: inline-flex;
  margin-right: 16px;
`;

type LettersType = {
  guesses: { [letter: string]: string };
  hints: string[];
  isWinner: boolean;
  letters: letterType[];
  mistakes: string[];
  selectedId: number;
  onSelect: (id: number) => void;
};

const Letters = ({
  letters,
  selectedId,
  guesses,
  hints,
  mistakes,
  isWinner,
  onSelect,
}: LettersType) => {
  const words = split(letters, (l) => l.letter === " ");
  const selectedLetter = letters.find((l) => l.id === selectedId)?.letter ?? "";

  return (
    <Container>
      {words.map((letters, wordIndex) => (
        <Word key={wordIndex}>
          {letters.map(({ id, letter }, index) => (
            <Letter
              key={index}
              id={id}
              isSelected={id === selectedId}
              isLetter={id !== null}
              isMistake={mistakes.includes(letter)}
              isHint={hints.includes(letter)}
              letter={letter}
              guess={guesses[letter] || " "}
              onSelect={onSelect}
              letterSelected={letter === selectedLetter}
              isWinner={isWinner}
            />
          ))}
        </Word>
      ))}
    </Container>
  );
};

export default Letters;
