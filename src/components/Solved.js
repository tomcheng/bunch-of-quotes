import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { quoteType } from "../utils/customPropTypes";
import Button from "./Button";
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

const ButtonContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
`;

const Solved = ({ quotes, onGoBack }) => (
  <Container>
    <Body>
      <Quotes>
        {quotes.length ? (
          quotes.map(quote => (
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

    <ButtonContainer>
      <Button onClick={onGoBack}>Go back</Button>
    </ButtonContainer>
  </Container>
);

Solved.propTypes = {
  quotes: PropTypes.arrayOf(quoteType).isRequired,
  onGoBack: PropTypes.func.isRequired
};

export default Solved;
