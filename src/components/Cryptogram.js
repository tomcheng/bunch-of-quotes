import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AnimateHeight from "react-animate-height-auto";
import Sidebar from "react-sidebar";
import SidebarContent from "./SidebarContent";
import FadeIn from "./FadeIn";
import Letters from "./Letters";
import Attribution from "./Attribution";
import Keyboard from "./Keyboard";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  line-height: 22px;
`;

const MainContent = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  padding: 20px;
  max-width: 1024px;
`;

const PlayAgainContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-grow: 1;
  flex-shrink: 0;
`;

const PlayAgainButton = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  padding: 0 15px;
  border-radius: 2px;
  font-weight: bold;
  background-color: #444;
  color: #fff;
  cursor: pointer;
  user-select: none;
  height: 54px;
  display: flex;
  align-items: center;
`;

const KeyboardContainer = styled.div`
  align-self: stretch;
`;

const Options = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
  color: ${props => (props.sidebarOpen ? "#fff" : "#444")};
  z-index: 1000000;
`;

const Cryptogram = ({
  isMobile,
  characters,
  selectedId,
  guesses,
  hints,
  quote,
  mistakes,
  isWinner,
  sidebarOpen,
  onClearGuesses,
  onDelete,
  onGuess,
  onPlayAgain,
  onRevealAnswer,
  onRevealLetter,
  onSelectLetter,
  onSelectNextLetter,
  onSelectPreviousLetter,
  onSetSidebarOpen,
  onShowMistakes,
  onToggleSidebar
}) => (
  <Sidebar
    sidebar={
      <SidebarContent
        isDesktop={!isMobile}
        onClearGuesses={onClearGuesses}
        onShowMistakes={onShowMistakes}
        onRevealLetter={onRevealLetter}
        onRevealAnswer={onRevealAnswer}
      />
    }
    onSetOpen={onSetSidebarOpen}
    open={sidebarOpen}
    touchHandleWidth={isWinner ? 0 : 20}
    pullRight={!isMobile}
  >
    <Container>
      <MainContent>
        <Letters
          letters={characters}
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
        {isWinner && (
          <FadeIn delay={2000}>
            {({ fadeInStyle }) => (
              <PlayAgainContainer style={fadeInStyle}>
                <PlayAgainButton onClick={onPlayAgain}>
                  Play Again
                </PlayAgainButton>
              </PlayAgainContainer>
            )}
          </FadeIn>
        )}
      </MainContent>

      {isMobile && (
        <KeyboardContainer>
          <AnimateHeight isExpanded={!isWinner} duration={300}>
            <Keyboard
              onTapPrevious={onSelectPreviousLetter}
              onTapNext={onSelectNextLetter}
              onTapLetter={onGuess}
              onTapDelete={onDelete}
            />
          </AnimateHeight>
        </KeyboardContainer>
      )}

      {!isMobile && (
        <Options onClick={onToggleSidebar} sidebarOpen={sidebarOpen}>
          <span style={{ display: sidebarOpen ? "none" : "inline" }}>
            <i className="fa fa-cog" />
          </span>
          <span style={{ display: sidebarOpen ? "inline-block" : "none" }}>
            <i className="fa fa-times" />
          </span>
        </Options>
      )}
    </Container>
  </Sidebar>
);

Cryptogram.propTypes = {
  cipher: PropTypes.objectOf(PropTypes.string).isRequired,
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      letter: PropTypes.string.isRequired,
      id: PropTypes.number
    })
  ).isRequired,
  guesses: PropTypes.objectOf(PropTypes.string).isRequired,
  hints: PropTypes.arrayOf(PropTypes.string).isRequired,
  isMobile: PropTypes.bool.isRequired,
  isWinner: PropTypes.bool.isRequired,
  mistakes: PropTypes.arrayOf(PropTypes.string).isRequired,
  quote: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    context: PropTypes.string,
    occupation: PropTypes.string,
    time: PropTypes.string
  }).isRequired,
  selectedId: PropTypes.number.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  onClearGuesses: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onGuess: PropTypes.func.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  onRevealAnswer: PropTypes.func.isRequired,
  onRevealLetter: PropTypes.func.isRequired,
  onSelectLetter: PropTypes.func.isRequired,
  onSelectNextLetter: PropTypes.func.isRequired,
  onSelectPreviousLetter: PropTypes.func.isRequired,
  onSetSidebarOpen: PropTypes.func.isRequired,
  onShowMistakes: PropTypes.func.isRequired,
  onToggleSidebar: PropTypes.func.isRequired
};

export default Cryptogram;
