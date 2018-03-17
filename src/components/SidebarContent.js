import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  background-color: #fff;
  height: 100%;
`;

const SidebarContent = ({ onClearGuesses }) => (
  <Container>
    <div onClick={onClearGuesses}>Clear Guesses</div>
  </Container>
);

SidebarContent.propTypes = {
  onClearGuesses: PropTypes.func.isRequired,
};

export default SidebarContent;
