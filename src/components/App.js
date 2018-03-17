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
        text: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        occupation: PropTypes.string,
        time: PropTypes.string
      })
    ).isRequired
  };

  state = {
    cipher: generateCipher(),
    quoteIndex: 0,
    isMobile: window.innerWidth < MOBILE_SIZE,
    selectedId: 1,
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

  handleSelectLetter = ({ id }) => {
    this.setState({ selectedId: id});
  };

  handlePlayAgain = () => {
    this.setState(state => ({
      ...state,
      quoteIndex: state.quoteIndex + 1,
      cipher: generateCipher(),
      selectedId: 1
    }));
  };

  render() {
    const { quotes } = this.props;
    const { quoteIndex, cipher, selectedId, isMobile } = this.state;

    const currentQuote = quotes[quoteIndex];
    const characters = applyCipher(currentQuote.text, cipher)
      .split("")
      .map((letter, index) => ({
        id: alphabet.includes(letter) ? index + 1 : null,
        letter
      }));

    return (
      <Cryptogram
        isMobile={isMobile}
        quote={currentQuote}
        characters={characters}
        cipher={cipher}
        selectedId={selectedId}
        onPlayAgain={this.handlePlayAgain}
        onSelectLetter={this.handleSelectLetter}
      />
    );
  }
}

export default App;
