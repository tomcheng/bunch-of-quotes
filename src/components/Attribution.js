import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const removeWidows = str => str.replace(/ (\S{0,5})$/g, "\u00A0$1");
const formatTime = str => str.replace(/-/g, "\u200A\u2013\u200A");

const Container = styled.div`
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

const Attribution = ({ containerStyle, name, context, occupation, time}) => (
      <Container style={containerStyle}>
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
);

Attribution.propTypes = {
  name: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  context: PropTypes.string,
  occupation: PropTypes.string,
  time: PropTypes.string
};

export default Attribution;
