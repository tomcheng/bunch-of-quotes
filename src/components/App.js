import PropTypes from "prop-types";
import React, { Component } from "react";
import { generateCipher, applyCipher } from "../utils/cipher";
import { alphabet } from "../utils/constants";
import Cryptogram from "./Cryptogram";

const MOBILE_SIZE = 1024;

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
    cipher: generateCipher(),
    quoteIndex: 0,
    isMobile: window.innerWidth < MOBILE_SIZE
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < MOBILE_SIZE });
  };

  handlePlayAgain = () => {
    this.setState(state => ({
      ...state,
      quoteIndex: state.quoteIndex + 1,
      cipher: generateCipher()
    }));
  };

  render() {
    const { quotes } = this.props;
    const { quoteIndex, cipher, isMobile } = this.state;

    const currentQuote = quotes[quoteIndex];
    const characters = applyCipher(currentQuote.quote, cipher)
      .split("")
      .map((letter, index) => ({
        id: alphabet.includes(letter) ? index + 1 : null,
        letter
      }));

    return (
      <Cryptogram
        {...currentQuote}
        characters={characters}
        cipher={cipher}
        isMobile={isMobile}
        onPlayAgain={this.handlePlayAgain}
      />
    );
  }
}

export default App;
