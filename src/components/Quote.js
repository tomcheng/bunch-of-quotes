import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/flow";

const convertDumbQuotes = str => str.replace(/(\S)'/g, "$1\u2019");
const convertRightDoubleQuotes = str => str.replace(/(\S)"/g, "$1\u201D");
const convertLeftDoubleQuotes = str => str.replace(/"(\S)/g, "\u201C$1");
const convertHyphens = str => str.replace(/( - )|(--)/g, "\u2014");
const convertEllipses = str => str.replace(/\.\.\./g, "\u2026");
const removeWidows = str => str.replace(/ (\S*)$/g, "\u00A0$1");
const formatTime = str => str.replace(/-/g, "\u200A\u2013\u200A");

const StyledQuote = styled.div`
  font-family: "EB Garamond", serif;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 15px;
  
  @media (min-width: 500px) {
    font-size: 26px;
    line-height: 36px;
    margin-bottom: 18px;
  }

  @media (min-width: 600px) {
    font-size: 28px;
    line-height: 40px;
    margin-bottom: 20px;
  }
`;

const StyledName = styled.div`
  text-align: right;
  font-family: "Crimson Text", serif;
  font-size: 16px;
  line-height: 24px;

  @media (min-width: 500px) {
    font-size: 17px;
    line-height: 28px;
  }
`;

const StyledPosition = styled.div`
  text-align: right;
  font-family: "Libre Baskerville", serif;
  font-style: italic;
  font-size: 12px;
  line-height: 18px;
`;

const Quote = props => {
  const { quote } = props.quote;
  const { position, time, name } = props.quote.author;
  const formattedQuote = flow(
    convertDumbQuotes,
    convertRightDoubleQuotes,
    convertLeftDoubleQuotes,
    convertHyphens,
    convertEllipses,
    removeWidows
  )(quote);

  return (
    <div>
      <StyledQuote>
        {formattedQuote}
      </StyledQuote>
      <StyledName>
        {name}
      </StyledName>
      {!!position && (
        <StyledPosition>
          {position}{time && `, ${formatTime(time)}`}
        </StyledPosition>
      )}
    </div>
  );
};

Quote.propTypes = {
  quote: PropTypes.shape({
    quote: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      position: PropTypes.string,
      time: PropTypes.string
    }).isRequired,
  }).isRequired
};

export default Quote;
