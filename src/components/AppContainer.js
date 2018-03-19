import React, { Component } from "react";
import App from "./App";
import {
  getUnsolvedQuote,
  getSolvedQuotes,
  markQuoteAsSolved
} from "../quotesRepo";

class AppContainer extends Component {
  state = {
    currentQuote: getUnsolvedQuote(),
    solvedQuotes: getSolvedQuotes()
  };

  handleGetNewQuote = () => {
    this.setState({ currentQuote: getUnsolvedQuote() });
  };

  handleMarkAsSolved = () => {
    markQuoteAsSolved(this.state.currentQuote);
    this.setState({ solvedQuotes: getSolvedQuotes() });
  };

  render() {
    const { currentQuote, solvedQuotes } = this.state;

    return (
      <App
        currentQuote={currentQuote}
        solvedQuotes={solvedQuotes}
        onGetNewQuote={this.handleGetNewQuote}
        onMarkAsSolved={this.handleMarkAsSolved}
      />
    );
  }
}

export default AppContainer;
