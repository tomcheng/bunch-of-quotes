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

  state = { quoteIndex: 0 };

  handlePlayAgain = () => {
    this.setState(state => ({ ...state, quoteIndex: state.quoteIndex + 1 }));
  };

  render() {
    const { quotes } = this.props;
    const { quoteIndex } = this.state;

    return (
      <Cryptogram {...quotes[quoteIndex]} onPlayAgain={this.handlePlayAgain} />
    );
  }
}

export default App;
