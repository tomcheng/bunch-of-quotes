import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/flow";

const convertDumbQuotes = str => str.replace(/(\S)'/g, "$1\u2019");
const convertRightDoubleQuotes = str => str.replace(/(\S)"/g, "$1\u201D");
const convertLeftDoubleQuotes = str => str.replace(/"(\S)/g, "\u201C$1");
const convertHyphens = str => str.replace(/( - )|(--)/g, "\u2014");
const convertEllipses = str => str.replace(/\.\.\./g, "\u2026");
const useNonBreakingHyphens = str => str.replace(/(\w)-(\w)/g, "$1\uFEFF-\uFEFF$2");
const removeWidows = str => str.replace(/ (\S{0,5})$/g, "\u00A0$1");
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
  font-family: "Crimson Text", serif;
  text-align: right;
  font-size: 16px;
  line-height: 24px;

  @media (min-width: 500px) {
    font-size: 17px;
    line-height: 28px;
  }
`;

const StyledPosition = styled.div`
  font-family: "Libre Baskerville", serif;
  text-align: right;
  font-style: italic;
  font-size: 12px;
  line-height: 18px;
`;

const StyledTime = styled.span`
  font-family: "Crimson Text", serif;
  text-align: right;
  font-size: 13px;
  font-style: normal;
`;

const Quote = props => {
  const { quote, context } = props.quote;
  const { position, time, name } = props.quote.author;
  const formattedQuote = flow(
    convertDumbQuotes,
    convertRightDoubleQuotes,
    convertLeftDoubleQuotes,
    convertHyphens,
    convertEllipses,
    useNonBreakingHyphens,
    removeWidows
  )(quote);

  return (
    <div>
      <StyledQuote>
        {formattedQuote}
      </StyledQuote>
      <StyledName>
        {name}{context && `, ${context}`}
      </StyledName>
      {(position || time) && (
        <StyledPosition>
          {removeWidows(position)}{!!position && !!time && ", "}{time && <StyledTime>{formatTime(time)}</StyledTime>}
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
