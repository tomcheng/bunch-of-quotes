import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Footer from "./Footer";
import Attribution from "./Attribution";
import type { Quote as QuoteType } from "./types";

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

type SolvedProps = {
  quotes: QuoteType[];
  onGoBack: () => void;
};

const Solved = ({ quotes, onGoBack }: SolvedProps) => (
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

export default Solved;
