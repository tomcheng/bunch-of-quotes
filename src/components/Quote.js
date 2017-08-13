import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/flow";

const convertDumbQuotes = str => str.replace(/(\S)'/g, "$1\u2019");
const convertRightDoubleQuotes = str => str.replace(/(\S)"/g, "$1\u201D");
const convertLeftDoubleQuotes = str => str.replace(/"(\S)/g, "\u201C$1");
const convertHyphens = str => str.replace(/ - /g, "\u2014");
const removeWidows = str => str.replace(/ (\S*)$/g, "\u00A0$1");

const StyledQuote = styled.div`
  font-family: "EB Garamond", serif;
  font-size: 28px;
  line-height: 36px;
  margin-bottom: 24px;
`;

const StyledName = styled.div`
  text-align: right;
  font-family: "Crimson Text", serif;
  font-size: 17px;
  line-height: 28px;
`;

const StyledPosition = styled.div`
  text-align: right;
  font-family: "Libre Baskerville", serif;
  font-style: italic;
  font-size: 12px;
  line-height: 20px;
`;

const Quote = props => {
  const { quote } = props.quote;
  const { position, time, name } = props.quote.author;
  const formattedQuote = flow(
    convertDumbQuotes,
    convertRightDoubleQuotes,
    convertLeftDoubleQuotes,
    convertHyphens,
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
      <StyledPosition>
        {position}, {time}
      </StyledPosition>
    </div>
  );
};

Quote.propTypes = {
  quote: PropTypes.shape({
    quote: PropTypes.string.isRequired
  }).isRequired
};

export default Quote;
