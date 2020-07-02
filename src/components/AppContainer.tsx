import React, { Component } from "react";
import App from "./App";
import { generateCipher, applyCipher } from "../utils/cipher";
import { alphabet } from "../utils/constants";
import {
  getUnsolvedQuote,
  getSolvedQuotes,
  markQuoteAsSolved,
} from "../quotesRepo";
import type { Quote } from "./types";

const MOBILE_SIZE = 1024;

const getCharacters = (
  cipher: { [letter: string]: string },
  currentQuote: Quote
) => {
  let id = 0;

  return applyCipher(currentQuote.text, cipher)
    .split("")
    .map((letter) => ({
      id: alphabet.includes(letter) ? ++id : null,
      letter,
    }));
};

class AppContainer extends Component {
  state = {
    cipher: generateCipher(),
    currentQuote: getUnsolvedQuote(),
    isMobile: window.innerWidth < MOBILE_SIZE,
    solvedQuotes: getSolvedQuotes(),
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

  handleGetNewQuote = () => {
    this.setState({
      cipher: generateCipher(),
      currentQuote: getUnsolvedQuote(),
    });
  };

  handleMarkAsSolved = () => {
    markQuoteAsSolved(this.state.currentQuote);
    this.setState({ solvedQuotes: getSolvedQuotes() });
  };

  render() {
    const { cipher, currentQuote, solvedQuotes, isMobile } = this.state;

    return (
      <App
        cipher={cipher}
        characters={getCharacters(cipher, currentQuote)}
        currentQuote={currentQuote}
        solvedQuotes={solvedQuotes}
        isMobile={isMobile}
        onGetNewQuote={this.handleGetNewQuote}
        onMarkAsSolved={this.handleMarkAsSolved}
      />
    );
  }
}

export default AppContainer;
