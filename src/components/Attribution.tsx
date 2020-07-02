import React from "react";
import styled from "styled-components";

const removeWidows = (str: string) => str.replace(/ (\S{0,5})$/g, "\u00A0$1");
const formatTime = (str: string) => str.replace(/-/g, "\u200A\u2013\u200A");

const Container = styled.div`
  text-align: right;
  font-size: 14px;
  line-height: 20px;
`;

const Occupation = styled.div`
  opacity: 0.6;
  font-size: 13px;
`;

const Time = styled.span`
  white-space: nowrap;
`;

type AttributionProps = {
  name: string;
  containerStyle?: object;
  context?: string;
  occupation?: string;
  time?: string;
};

const Attribution = ({
  containerStyle,
  name,
  context,
  occupation,
  time,
}: AttributionProps) => (
  <Container style={containerStyle}>
    <div>
      {name}
      {context && `, ${context}`}
    </div>
    {(occupation || time) && (
      <Occupation>
        {occupation && removeWidows(occupation)}
        {!!occupation && !!time && ", "}
        {time && <Time>{formatTime(time)}</Time>}
      </Occupation>
    )}
  </Container>
);

export default Attribution;
