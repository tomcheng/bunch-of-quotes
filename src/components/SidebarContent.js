import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  background-color: #919faa;
  height: 100%;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  line-height: 22px;
  min-width: 200px;
  padding: ${props => (props.isDesktop ? "40px 4px 4px" : "4px")};
`;

const Action = styled.div`
  padding: 0 20px;
  background-color: #fff;
  margin-bottom: 4px;
  border-radius: 2px;
  font-weight: bold;
  height: 54px;
  display: flex;
  align-items: center;
  cursor: pointer;
  pointer-events: ${props => (props.disabled ? "none" : "auto")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
`;

const SidebarContent = ({
  isDesktop,
  isWinner,
  showSolved,
  onClearGuesses,
  onRevealLetter,
  onShowMistakes,
  onRevealAnswer,
  onToggleShowSolvedQuotes
}) => (
  <Container isDesktop={isDesktop}>
    <Action onClick={onToggleShowSolvedQuotes}>
      {showSolved ? "Go back" : "See solved quotes"}
    </Action>
    <Action onClick={onClearGuesses} disabled={isWinner || showSolved}>
      Clear guesses
    </Action>
    <Action onClick={onShowMistakes} disabled={isWinner || showSolved}>
      Show mistakes
    </Action>
    <Action onClick={onRevealLetter} disabled={isWinner || showSolved}>
      Reveal letter
    </Action>
    <Action onClick={onRevealAnswer} disabled={isWinner || showSolved}>
      Reveal answer
    </Action>
  </Container>
);

SidebarContent.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  isWinner: PropTypes.bool.isRequired,
  showSolved: PropTypes.bool.isRequired,
  onClearGuesses: PropTypes.func.isRequired,
  onRevealAnswer: PropTypes.func.isRequired,
  onRevealLetter: PropTypes.func.isRequired,
  onShowMistakes: PropTypes.func.isRequired,
  onToggleShowSolvedQuotes: PropTypes.func.isRequired
};

export default SidebarContent;
