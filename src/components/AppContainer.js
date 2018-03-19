import React, { Component } from "react";
import App from "./App";
import { generateCipher, applyCipher } from "../utils/cipher";
import { alphabet } from "../utils/constants";
import {
  getUnsolvedQuote,
  getSolvedQuotes,
  markQuoteAsSolved
} from "../quotesRepo";

const getCharacters = (cipher, currentQuote) =>
  applyCipher(currentQuote.text, cipher)
    .split("")
    .map((letter, index) => ({
      id: alphabet.includes(letter) ? index + 1 : null,
      letter
    }));

class AppContainer extends Component {
  state = {
    cipher: generateCipher(),
    currentQuote: getUnsolvedQuote(),
    solvedQuotes: getSolvedQuotes()
  };

  handleGetNewQuote = () => {
    this.setState({
      cipher: generateCipher(),
      currentQuote: getUnsolvedQuote()
    });
  };

  handleMarkAsSolved = () => {
    markQuoteAsSolved(this.state.currentQuote);
    this.setState({ solvedQuotes: getSolvedQuotes() });
  };

  render() {
    const { cipher, currentQuote, solvedQuotes } = this.state;

    return (
      <App
        cipher={cipher}
        characters={getCharacters(cipher, currentQuote)}
        currentQuote={currentQuote}
        solvedQuotes={solvedQuotes}
        onGetNewQuote={this.handleGetNewQuote}
        onMarkAsSolved={this.handleMarkAsSolved}
      />
    );
  }
}

export default AppContainer;
