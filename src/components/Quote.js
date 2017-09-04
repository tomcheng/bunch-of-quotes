import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import flow from "lodash/flow";
import Animations, { cubicInOut } from "../utils/animations.js";

const convertDumbQuotes = str => str.replace(/(\S)'/g, "$1\u2019");
const convertLeftSingleQuotes = str => str.replace(/'(\S)/g, "\u2018$1");
const convertRightDoubleQuotes = str => str.replace(/(\S)"/g, "$1\u201D");
const convertLeftDoubleQuotes = str => str.replace(/"(\S)/g, "\u201C$1");
const convertHyphens = str => str.replace(/( - )|(--)/g, "\u2014");
const convertEllipses = str => str.replace(/\.\.\./g, "\u2026");
const useNonBreakingHyphens = str =>
  str.replace(/(\w)-(\w)/g, "$1\uFEFF-\uFEFF$2");
const removeWidows = str => str.replace(/ (\S{0,5})$/g, "\u00A0$1");
const formatTime = str => str.replace(/-/g, "\u200A\u2013\u200A");

const StyledQuote = styled.div`
  font-family: "EB Garamond", serif;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 16px;

  @media (min-width: 500px) {
    font-size: 26px;
    line-height: 34px;
    margin-bottom: 20px;
  }

  @media (min-width: 600px) {
    font-size: 28px;
    line-height: 38px;
    margin-bottom: 22px;
  }
`;

const StyledName = styled.div`
  font-family: "Crimson Text", serif;
  text-align: right;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 3px;

  @media (min-width: 500px) {
    font-size: 17px;
    line-height: 24px;
  }
`;

const StyledOccupation = styled.div`
  font-family: "Libre Baskerville", serif;
  text-align: right;
  font-style: italic;
  font-size: 12px;
  line-height: 16px;
`;

const StyledTime = styled.span`
  font-family: "Crimson Text", serif;
  text-align: right;
  font-size: 13px;
  font-style: normal;
  white-space: nowrap;
`;

class Quote extends Component {
  static propTypes = {
    quote: PropTypes.shape({
      quote: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      occupation: PropTypes.string,
      time: PropTypes.string
    }).isRequired,
    seen: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super();

    this.state = {
      quoteOpacity: props.seen ? 1 : 0,
      nameOpacity: props.seen ? 1 : 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.seen && nextProps.seen) {
      this.animateIn();
    } else if (this.props.seen && !nextProps.seen) {
      clearTimeout(this.timer);
      Animations.stop("quote-opacity");
      Animations.stop("name-opacity");
      this.setState({ quoteOpacity: 0, nameOpacity: 0 });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    Animations.stop("quote-opacity");
    Animations.stop("name-opacity");
  }

  animateIn = () => {
    this.setState({ quoteOpacity: 0, nameOpacity: 0 });

    Animations.animate({
      name: "quote-opacity",
      start: 0,
      end: 1,
      duration: 600,
      easing: cubicInOut,
      onUpdate: quoteOpacity => {
        this.setState({ quoteOpacity });
      }
    });

    this.timer = setTimeout(() => {
      Animations.animate({
        name: "name-opacity",
        start: 0,
        end: 1,
        duration: 1200,
        easing: cubicInOut,
        onUpdate: nameOpacity => {
          this.setState({ nameOpacity });
        }
      });
    }, 200);
  };

  render() {
    const { quote, context, name, position, occupation, time } = this.props.quote;
    const { quoteOpacity, nameOpacity } = this.state;
    const formattedQuote = flow(
      convertDumbQuotes,
      convertLeftSingleQuotes,
      convertRightDoubleQuotes,
      convertLeftDoubleQuotes,
      convertHyphens,
      convertEllipses,
      useNonBreakingHyphens,
      removeWidows
    )(quote);

    return (
      <div>
        <StyledQuote style={{ opacity: quoteOpacity }}>
          {formattedQuote}
        </StyledQuote>
        <div style={{ opacity: nameOpacity }}>
          <StyledName>
            {name}
            {context && `, ${context}`}
          </StyledName>
          {(position || time) &&
            <StyledOccupation>
              {removeWidows(occupation)}
              {!!occupation && !!time && ", "}
              {time &&
                <StyledTime>
                  {formatTime(time)}
                </StyledTime>}
            </StyledOccupation>}
        </div>
      </div>
    );
  }
}

export default Quote;
