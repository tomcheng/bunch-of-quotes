import React, { Component } from "react";
import App from "./App";
import { getUnsolvedQuote, getSolvedQuotes, markQuoteAsSolved } from "../quotesRepo";

class AppContainer extends Component {
  state = {
    currentQuote: getUnsolvedQuote(),
    solvedQuotes: getSolvedQuotes()
  };

  handleGetNewQuote = () => {
    markQuoteAsSolved(this.state.currentQuote);

    this.setState({
      currentQuote: getUnsolvedQuote(),
      solvedQuotes: getSolvedQuotes() 
    });
  };

  render() {
    const { currentQuote } = this.state;

    return (
      <App currentQuote={currentQuote} onGetNewQuote={this.handleGetNewQuote} />
    );
  }
}

export default AppContainer;
