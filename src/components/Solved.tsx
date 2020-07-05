import React, { useState } from "react";
import styled from "styled-components";
import chunk from "lodash/chunk";
import Attribution from "./Attribution";
import type { Quote as QuoteType } from "./types";

const QUOTES_PER_PAGE = 10;

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
`;

const Header = styled.div`
  border-bottom: 1px solid #ccc;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 10px 20px;
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

const IconButton = styled.button`
  padding: 10px;
  background-color: transparent;
  border: 0;
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding: 10px 0;
  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
`;

const PaginationLabel = styled.div`
  margin: 0 5px;
  font-size: 14px;
`;

type SolvedProps = {
  quotes: QuoteType[];
  onGoBack: () => void;
};

const Solved = ({ quotes, onGoBack }: SolvedProps) => {
  const [page, setPage] = useState(0);
  const pages = chunk(quotes, QUOTES_PER_PAGE);

  return (
    <Container>
      <Header>
        <IconButton onClick={onGoBack}>
          <i className="fa fa-arrow-left" />
        </IconButton>
      </Header>
      <Body>
        <Quotes>
          {quotes.length ? (
            pages[page].map((quote) => (
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

      {pages.length > 1 && (
        <Footer>
          <IconButton disabled={page === 0} onClick={() => setPage(page - 1)}>
            <i className="fa fa-chevron-left" />
          </IconButton>
          <PaginationLabel>
            {page * QUOTES_PER_PAGE + 1} -{" "}
            {Math.min((page + 1) * QUOTES_PER_PAGE, quotes.length)} of{" "}
            {quotes.length}
          </PaginationLabel>
          <IconButton
            disabled={page === pages.length - 1}
            onClick={() => setPage(page + 1)}
          >
            <i className="fa fa-chevron-right" />
          </IconButton>
        </Footer>
      )}
    </Container>
  );
};

export default Solved;
