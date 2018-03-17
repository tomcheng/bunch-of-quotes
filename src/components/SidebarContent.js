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
`;

const Action = styled.div`
  padding: 0 20px;
  background-color: #fff;
  margin: 4px;
  border-radius: 2px;
  font-weight: bold;
  height: 54px;
  display: flex;
  align-items: center;
`;

const SidebarContent = ({ onClearGuesses, onGetHint, onShowMistakes, onRevealAnswer }) => (
  <Container>
    <Action onClick={onGetHint}>Get a hint</Action>
    <Action onClick={onShowMistakes}>Show mistakes</Action>
    <Action onClick={onClearGuesses}>Clear guesses</Action>
    <Action onClick={onRevealAnswer}>Reveal Answer</Action>
  </Container>
);

SidebarContent.propTypes = {
  onClearGuesses: PropTypes.func.isRequired,
  onGetHint: PropTypes.func.isRequired,
  onRevealAnswer: PropTypes.func.isRequired,
  onShowMistakes: PropTypes.func.isRequired
};

export default SidebarContent;
