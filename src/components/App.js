import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import DraggablePanes from "./DraggablePanes";
import Quote from "./Quote";

const QuoteContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  @media (min-width: 400px) {
    width: 85%;
    padding: 0;
  }
`;

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
    this.setState(state => ({ currentIndex: state.currentIndex - 1 }));
  };

  updateLastIndexSeen = () => {
    this.setState(state => ({
      lastIndexSeen: Math.max(state.lastIndexSeen, state.currentIndex)
    }));
  };

  render() {
    const { quotes } = this.props;
    const { currentIndex, lastIndexSeen } = this.state;

    const previousIndex = currentIndex - 1;
    const previousQuote = quotes[previousIndex];
    const nextIndex = currentIndex + 1;
    const nextQuote = quotes[nextIndex];

    return (
      <DraggablePanes
        atStart={currentIndex === 0}
        atEnd={currentIndex === quotes.length - 1}
        quotes={quotes}
        onDraggedNext={this.handleDraggedNext}
        onDraggedPrevious={this.handleDraggedPrevious}
        leftPane={
          <QuoteContainer>
            {previousQuote &&
              <Quote key={previousIndex} quote={previousQuote} seen />}
          </QuoteContainer>
        }
        middlePane={
          <QuoteContainer>
            <Quote
              key={currentIndex}
              quote={quotes[currentIndex]}
              seen={lastIndexSeen >= currentIndex}
            />
          </QuoteContainer>
        }
        rightPane={
          <QuoteContainer>
            {nextQuote &&
              <Quote
                key={nextIndex}
                quote={nextQuote}
                seen={lastIndexSeen >= nextIndex}
              />}
          </QuoteContainer>
        }
      />
    );
  }
}

export default App;
