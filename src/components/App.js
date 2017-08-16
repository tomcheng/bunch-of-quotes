import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import Quote from "./Quote";
import random from "lodash/random";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;

  @media (min-width: 400px) {
    width: 85%;
    padding: 0;
  }
`;

const QuoteContainer = styled.div`
  padding: 15px 0;
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  position: relative;
`;

class App extends Component {
  static propTypes = {
    quotes: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.shape({
          name: PropTypes.string.isRequired,
          time: PropTypes.string,
          position: PropTypes.string
        }).isRequired,
        quote: PropTypes.string.isRequired
      })
    ).isRequired
  };

  constructor(props) {
    super();

    this.state = {
      currentQuoteIndex: random(0, props.quotes.length - 1)
    };
  }

  handleClick = evt => {
    evt.preventDefault();

    this.setState({
      currentQuoteIndex: random(0, this.props.quotes.length - 1)
    });
  };

  render() {
    const { quotes } = this.props;
    const { currentQuoteIndex } = this.state;
    const currentQuote = quotes[currentQuoteIndex];

    return (
      <Container>
        <QuoteContainer onClick={this.handleClick}>
          <Quote quote={currentQuote} />
        </QuoteContainer>
      </Container>
    );
  }
}

export default App;
