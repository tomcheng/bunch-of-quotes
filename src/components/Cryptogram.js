import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AnimateHeight from "react-animate-height-auto";
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
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  line-height: 22px;
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
  onDelete,
  onGuess,
  onPlayAgain,
  onSelectDoubleNextLetter,
  onSelectDoublePreviousLetter,
  onSelectLetter,
  onSelectNextLetter,
  onSelectPreviousLetter,
  onToggleSidebar
}) => (
  <Container>
    <Body>
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

    {isMobile && (
      <AnimateHeight isExpanded={!isWinner} duration={300}>
        <Keyboard
          onTapDoublePrevious={onSelectDoublePreviousLetter}
          onTapPrevious={onSelectPreviousLetter}
          onTapNext={onSelectNextLetter}
          onTapDoubleNext={onSelectDoubleNextLetter}
          onTapLetter={onGuess}
          onTapDelete={onDelete}
        />
      </AnimateHeight>
    )}

    {!isMobile && (
      <Options onClick={onToggleSidebar} sidebarOpen={sidebarOpen}>
        <span style={{ display: sidebarOpen ? "none" : "inline" }}>
          <i className="fa fa-cog" />
        </span>
        <span style={{ display: sidebarOpen ? "inline" : "none" }}>
          <i className="fa fa-times" />
        </span>
      </Options>
    )}
  </Container>
);

Cryptogram.propTypes = {
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
  onDelete: PropTypes.func.isRequired,
  onGuess: PropTypes.func.isRequired,
  onPlayAgain: PropTypes.func.isRequired,
  onSelectDoubleNextLetter: PropTypes.func.isRequired,
  onSelectDoublePreviousLetter: PropTypes.func.isRequired,
  onSelectLetter: PropTypes.func.isRequired,
  onSelectNextLetter: PropTypes.func.isRequired,
  onSelectPreviousLetter: PropTypes.func.isRequired,
  onToggleSidebar: PropTypes.func.isRequired
};

export default Cryptogram;
