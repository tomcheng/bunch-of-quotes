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
`;

const SidebarContent = ({
  isDesktop,
  onClearGuesses,
  onRevealLetter,
  onShowMistakes,
  onRevealAnswer,
  onToggleShowSolvedQuotes
}) => (
  <Container isDesktop={isDesktop}>
    <Action onClick={onToggleShowSolvedQuotes}>
      See solved quotes
    </Action>
    <Action onClick={onClearGuesses}>
      Clear guesses
    </Action>
    <Action onClick={onShowMistakes}>
      Show mistakes
    </Action>
    <Action onClick={onRevealLetter}>
      Reveal letter
    </Action>
    <Action onClick={onRevealAnswer}>
      Reveal answer
    </Action>
  </Container>
);

SidebarContent.propTypes = {
  isDesktop: PropTypes.bool.isRequired,
  onClearGuesses: PropTypes.func.isRequired,
  onRevealAnswer: PropTypes.func.isRequired,
  onRevealLetter: PropTypes.func.isRequired,
  onShowMistakes: PropTypes.func.isRequired,
  onToggleShowSolvedQuotes: PropTypes.func.isRequired
};

export default SidebarContent;
