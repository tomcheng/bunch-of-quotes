import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import Quote from "./Quote";
import random from "lodash/random";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 24px auto 0;
  padding: 0 20px;
  box-sizing: border-box;
  
  @media (min-width: 400px) {
    width: 85%;
    padding: 0;
  }
`;

class App extends Component {
  static propTypes = {
    quotes: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.shape({
          name: PropTypes.string.isRequired,
          time: PropTypes.string.isRequired,
          position: PropTypes.string.isRequired,
        }).isRequired,
        id: PropTypes.number.isRequired,
        quote: PropTypes.string.isRequired
      })
    ).isRequired
  };

  constructor (props) {
    super();

    const currentQuoteIndex = random(0, props.quotes.length - 1);
    this.state = { currentQuoteIndex };
  }

  render() {
    const { quotes } = this.props;
    const { currentQuoteIndex } = this.state;
    const currentQuote = quotes[currentQuoteIndex];

    return (
      <Container>
        <Quote quote={currentQuote} />
      </Container>
    );
  }
}

export default App;
