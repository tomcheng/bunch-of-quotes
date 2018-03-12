import PropTypes from "prop-types";
import React, { Component } from "react";
import Cryptogram from "./Cryptogram";

class App extends Component {
  static propTypes = {
    quotes: PropTypes.arrayOf(
      PropTypes.shape({
        quote: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        occupation: PropTypes.string,
        time: PropTypes.string
      })
    ).isRequired
  };

  state = {
    currentIndex: 0,
    lastIndexSeen: 0
  };

  handleDraggedNext = () => {
    this.setState(
      state => ({ currentIndex: state.currentIndex + 1 }),
      this.updateLastIndexSeen
    );
  };

  handleDraggedPrevious = () => {
    this.setState(state => ({
      currentIndex: Math.max(state.currentIndex - 1, 0)
    }));
  };

  updateLastIndexSeen = () => {
    this.setState(state => ({
      lastIndexSeen: Math.max(state.lastIndexSeen, state.currentIndex)
    }));
  };

  render() {
    const { quotes } = this.props;
    const { currentIndex } = this.state;

    return (
      <Cryptogram text={quotes[currentIndex].quote} />
    );
  }
}

export default App;
