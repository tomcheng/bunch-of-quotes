import React from "react";
import PropTypes from "prop-types";
import FadeIn from "./FadeIn";
import styled from "styled-components";

const removeWidows = str => str.replace(/ (\S{0,5})$/g, "\u00A0$1");
const formatTime = str => str.replace(/-/g, "\u200A\u2013\u200A");

const Container = styled.div`
  margin-top: 15px;
  text-align: right;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #444;
`;

const Occupation = styled.div`
  opacity: 0.6;
  font-size: 13px;
`;

const Time = styled.span`
  white-space: nowrap;
`;

const Attribution = ({ name, context, occupation, time}) => (
  <FadeIn delay={1000}>
    {({ fadeInStyle }) => (
      <Container style={fadeInStyle}>
        <div>
          {name}
          {context && `, ${context}`}
        </div>
        {(occupation || time) && (
          <Occupation>
            {removeWidows(occupation)}
            {!!occupation && !!time && ", "}
            {time && <Time>{formatTime(time)}</Time>}
          </Occupation>
        )}
      </Container>
    )}
  </FadeIn>
);

Attribution.propTypes = {
  name: PropTypes.string.isRequired,
  context: PropTypes.string,
  occupation: PropTypes.string,
  time: PropTypes.string
};

export default Attribution;
