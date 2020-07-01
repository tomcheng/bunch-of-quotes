import React from "react";
import styled, { css, keyframes } from "styled-components";

const blink = keyframes`
  0%, 100% {
    background-color: #444;
    color: #fff;
  }
  50% {
    background-color: transparent;
    color: inherit;
  }
`;

const errorBlink = keyframes`
  0%, 100% {
    background-color: red;
    color: #fff;
  }
  50% {
    background-color: transparent;
    color: red;
  }
`;

const Container = styled.div`
  width: 16px;
  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  padding-bottom: 10px;
  margin: 0 1px;
  user-select: none;
`;

type GuessedLetter = {
  isHint: boolean;
  isMistake: boolean;
  isSelected: boolean;
  isWinner: boolean;
  letterSelected: boolean;
};

const animationMixin = css`
  animation: 1.1s
    ${(props: GuessedLetter) => (props.isMistake ? errorBlink : blink)} step-end
    infinite;
`;

const GuessedLetter = styled.div`
  background-color: ${(props: GuessedLetter) =>
    props.letterSelected && !props.isWinner ? "#eee" : "transparent"};
  color: ${(props) => (props.isMistake ? "red" : "inherit")};
  font-weight: ${(props) =>
    props.isHint && !props.isWinner ? "bold" : "inherit"};
  border: 0;
  display: block;
  height: 20px;
  padding: 0;
  text-align: center;
  line-height: 22px;
  margin-bottom: 1px;
  ${(props) => (props.isSelected && !props.isWinner ? animationMixin : "")};
`;

type EncryptedLetterProps = {
  isWinner: boolean;
};

const EncryptedLetter = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.8);
  opacity: ${(props: EncryptedLetterProps) => (props.isWinner ? 0.3 : 0.8)};
  transition: opacity 0.8s ease-out;
  font-family: Courier, mono-space;
  font-size: 14px;
  text-align: center;
`;

type LetterProps = {
  letter: string;
  isLetter: boolean;
  isHint: boolean;
  isMistake: boolean;
  isSelected: boolean;
  isWinner: boolean;
  letterSelected: boolean;
  onSelect: (id: number) => void;
  id?: number;
  guess?: string;
};

const Letter = ({
  id,
  letter,
  guess,
  isHint,
  isMistake,
  isSelected,
  letterSelected,
  isLetter,
  onSelect,
  isWinner,
}: LetterProps) => {
  if (!isLetter) {
    return <span>{letter}</span>;
  }

  return (
    <Container
      onClick={() => {
        if (typeof id === "number") {
          onSelect(id);
        }
      }}
    >
      <GuessedLetter
        isHint={isHint}
        isMistake={isMistake}
        isSelected={isSelected}
        isWinner={isWinner}
        letterSelected={letterSelected}
      >
        {guess}
      </GuessedLetter>
      <EncryptedLetter isWinner={isWinner}>{letter}</EncryptedLetter>
    </Container>
  );
};

export default Letter;
