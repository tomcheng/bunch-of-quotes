import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Dropdown from "./Dropdown";

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
`;

const Trigger = styled.div`
  padding: 15px;
  cursor: pointer;
`;

class Menu extends Component {
  static propTypes = {
    onClearGuesses: PropTypes.func.isRequired,
    onRevealAnswer: PropTypes.func.isRequired,
    onRevealLetter: PropTypes.func.isRequired,
    onShowMistakes: PropTypes.func.isRequired,
    onShowSolvedQuotes: PropTypes.func.isRequired
  };

  state = { dropdownOpen: false };

  handleToggleDropdown = () => {
    this.setState(state => ({ ...state, dropdownOpen: !state.dropdownOpen }));
  };

  render() {
    const {
      onClearGuesses,
      onRevealAnswer,
      onRevealLetter,
      onShowSolvedQuotes,
      onShowMistakes
    } = this.props;
    const { dropdownOpen } = this.state;

    return (
      <Container>
        <Dropdown
          options={[
            { label: "Show Solved Quotes", onClick: onShowSolvedQuotes },
            { label: "Clear Guesses", onClick: onClearGuesses },
            { label: "Show Mistakes", onClick: onShowMistakes },
            { label: "Reveal Letter", onClick: onRevealLetter },
            { label: "Reveal Answer", onClick: onRevealAnswer }
          ]}
          isOpen={dropdownOpen}
          onToggle={this.handleToggleDropdown}
        >
          <Trigger>
            <i className="fa fa-ellipsis-v" />
          </Trigger>
        </Dropdown>
      </Container>
    );
  }
}

export default Menu;
