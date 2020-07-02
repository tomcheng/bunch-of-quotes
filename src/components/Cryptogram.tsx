import React from "react";
import type { Character, Quote } from "./types";
import styled from "styled-components";
import values from "lodash/values";
import compact from "lodash/compact";
import FadeIn from "./FadeIn";
import Footer from "./Footer";
import Button from "./Button";
import Letters from "./Letters";
import Attribution from "./Attribution";
import Keyboard from "./Keyboard";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`;

const Body = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
`;

const MainContent = styled.div`
  position: relative;
  padding: 20px;
  max-width: 1024px;
  margin: 0 auto;
`;

type CryptogramProps = {
  characters: Character[];
  guesses: { [letter: string]: string | null };
  hints: string[];
  isMobile: boolean;
  isWinner: boolean;
  mistakes: string[];
  quote: Quote;
  selectedId: number;
  onDelete: () => void;
  onGuess: (letter: string) => void;
  onPlayAgain: () => void;
  onSelectDoubleNextLetter: () => void;
  onSelectDoublePreviousLetter: () => void;
  onSelectLetter: (id: number) => void;
  onSelectNextLetter: () => void;
  onSelectPreviousLetter: () => void;
};

const Cryptogram = ({
  isMobile,
  characters,
  selectedId,
  guesses,
  hints,
  quote,
  mistakes,
  isWinner,
  onDelete,
  onGuess,
  onPlayAgain,
  onSelectDoubleNextLetter,
  onSelectDoublePreviousLetter,
  onSelectLetter,
  onSelectNextLetter,
  onSelectPreviousLetter,
}: CryptogramProps) => (
  <Container>
    <Body>
      <MainContent>
        <Letters
          characters={characters}
          selectedId={selectedId}
          guesses={guesses}
          hints={hints}
          mistakes={mistakes}
          isWinner={isWinner}
          onSelect={onSelectLetter}
        />
        {isWinner && (
          <FadeIn delay={1000}>
            {({ fadeInStyle }) => (
              <Attribution
                {...quote}
                containerStyle={{ ...fadeInStyle, marginTop: 15 }}
              />
            )}
          </FadeIn>
        )}
      </MainContent>
    </Body>

    {isWinner && (
      <FadeIn delay={2000}>
        {({ fadeInStyle }) => (
          <Footer style={fadeInStyle}>
            <Button onClick={onPlayAgain}>Play Again</Button>
          </Footer>
        )}
      </FadeIn>
    )}

    {isMobile && !isWinner && (
      <Keyboard
        fadedLetters={compact(values(guesses))}
        onTapDoublePrevious={onSelectDoublePreviousLetter}
        onTapPrevious={onSelectPreviousLetter}
        onTapNext={onSelectNextLetter}
        onTapDoubleNext={onSelectDoubleNextLetter}
        onTapLetter={onGuess}
        onTapDelete={onDelete}
      />
    )}
  </Container>
);

export default Cryptogram;
