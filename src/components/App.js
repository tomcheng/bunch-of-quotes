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

  render() {
    const { quotes } = this.props;

    return (
      <Cryptogram {...quotes[0]} />
    );
  }
}

export default App;
