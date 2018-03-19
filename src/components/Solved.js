import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { quoteType } from "../utils/customPropTypes";
import Attribution from "./Attribution";

const Container = styled.div`
  padding: 20px;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
`;

const Quote = styled.div`
  padding: 20px 0;
  border-top: 1px solid #ccc;

  &:first-child {
    padding-top: 0;
    border-top: 0;
  }
`;

const QuoteText = styled.div`
  line-height: 22px;
  margin-bottom: 10px;
`;

const Solved = ({ quotes }) => (
  <Container>
    {quotes.map(quote => (
      <Quote key={quote.hash}>
        <QuoteText>{quote.text}</QuoteText>
        <Attribution {...quote} />
      </Quote>
    ))}
  </Container>
);

Solved.propTypes = {
  quotes: PropTypes.arrayOf(quoteType).isRequired
};

export default Solved;
