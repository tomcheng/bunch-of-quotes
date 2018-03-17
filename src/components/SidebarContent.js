import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  height: 100%;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 16px;
  line-height: 22px;
  min-width: 180px;
`;

const SidebarContent = ({ onClearGuesses, onGetHint, onShowMistakes }) => (
  <Container>
    <div onClick={onClearGuesses}>Clear Guesses</div>
    <div onClick={onShowMistakes}>Show Mistakes</div>
    <div onClick={onGetHint}>Get a Hint</div>
  </Container>
);

SidebarContent.propTypes = {
  onClearGuesses: PropTypes.func.isRequired,
  onGetHint: PropTypes.func.isRequired,
  onShowMistakes: PropTypes.func.isRequired
};

export default SidebarContent;
