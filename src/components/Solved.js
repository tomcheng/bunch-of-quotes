import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { quoteType } from "../utils/customPropTypes";
import Button from "./Button";
import Footer from "./Footer";
import Attribution from "./Attribution";

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
`;

const Body = styled.div`
  padding: 20px;
  flex-grow: 1;
  flex-shrink: 1;
  overflow: auto;
  display: flex;
  justify-content: center;
`;

const Quotes = styled.div`
  max-width: 1024px;
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

const EmptyText = styled.div`
  padding: 40px;
  text-align: center;
  opacity: 0.4;
`;

const Solved = ({ quotes, onGoBack }) => (
  <Container>
    <Body>
      <Quotes>
        {quotes.length ? (
          quotes.map((quote) => (
            <Quote key={quote.hash}>
              <QuoteText>{quote.text}</QuoteText>
              <Attribution {...quote} />
            </Quote>
          ))
        ) : (
          <EmptyText>No solved quotes</EmptyText>
        )}
      </Quotes>
    </Body>

    <Footer>
      <Button onClick={onGoBack}>Go back</Button>
    </Footer>
  </Container>
);

Solved.propTypes = {
  quotes: PropTypes.arrayOf(quoteType).isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default Solved;
