import React from "react";
import type { Character } from "./types";
import styled from "styled-components";
import Letter from "./Letter";

const split = (
  arr: Character[],
  predicate: (letterObj: Character) => boolean
): Character[][] => {
  const newArr: Character[][] = [[]];

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

type LettersProps = {
  characters: Character[];
  guesses: { [letter: string]: string | null };
  hints: string[];
  isWinner: boolean;
  mistakes: string[];
  selectedId: number;
  onSelect: (id: number) => void;
};

const Letters = ({
  characters,
  selectedId,
  guesses,
  hints,
  mistakes,
  isWinner,
  onSelect,
}: LettersProps) => {
  const words = split(characters, (l) => l.letter === " ");
  const selectedLetter =
    characters.find((l) => l.id === selectedId)?.letter ?? "";

  return (
    <Container>
      {words.map((characters, wordIndex) => (
        <Word key={wordIndex}>
          {characters.map(({ id, letter }, index) => (
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
