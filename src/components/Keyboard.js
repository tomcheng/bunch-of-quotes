import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const KEY_HEIGHT = 54;
const SHORT_KEY_HEIGHT = 42;
const ASSUMED_WIDTH = 411;
const SPACE = 4;
const SPACE_PERCENTAGE = SPACE / ASSUMED_WIDTH * 100;

const ARROW_KEY_WIDTH_PERCENTAGE =
  (ASSUMED_WIDTH - 3 * SPACE) / 2 / (ASSUMED_WIDTH - 2 * SPACE) * 100;

const TOP_NUM_KEYS = 10;
const KEY_WIDTH =
  (ASSUMED_WIDTH - 2 * SPACE - (TOP_NUM_KEYS - 1) * SPACE) / TOP_NUM_KEYS;
const TOP_KEY_WIDTH_PERCENTAGE = KEY_WIDTH / (ASSUMED_WIDTH - 2 * SPACE) * 100;

const MIDDLE_NUM_KEYS = 9;
const MIDDLE_PADDING =
  (ASSUMED_WIDTH -
    2 * SPACE -
    MIDDLE_NUM_KEYS * KEY_WIDTH -
    (MIDDLE_NUM_KEYS - 1) * SPACE) /
  2;
const MIDDLE_PADDING_PERCENTAGE =
  MIDDLE_PADDING / (ASSUMED_WIDTH - 2 * SPACE) * 100;
const MIDDLE_KEY_WIDTH_PERCENTAGE =
  KEY_WIDTH / (ASSUMED_WIDTH - 2 * SPACE - 2 * MIDDLE_PADDING) * 100;

const BOTTOM_NUM_KEYS = 7;
const DELETE_KEY_WIDTH = 2 * KEY_WIDTH + SPACE;
const BOTTOM_PADDING_LEFT =
  ASSUMED_WIDTH -
  2 * SPACE -
  BOTTOM_NUM_KEYS * KEY_WIDTH -
  BOTTOM_NUM_KEYS * SPACE -
  DELETE_KEY_WIDTH;
const BOTTOM_PADDING_LEFT_PERCENTAGE =
  BOTTOM_PADDING_LEFT / (ASSUMED_WIDTH - 2 * SPACE) * 100;
const BOTTOM_KEY_WIDTH_PERCENTAGE =
  KEY_WIDTH / (ASSUMED_WIDTH - 2 * SPACE - BOTTOM_PADDING_LEFT) * 100;
const DELETE_KEY_WIDTH_PERCENTAGE =
  DELETE_KEY_WIDTH / (ASSUMED_WIDTH - 2 * SPACE - BOTTOM_PADDING_LEFT) * 100;

const Container = styled.div`
  box-sizing: border-box;
  background-color: #919faa;
  padding: ${SPACE_PERCENTAGE}%;
`;

const KeyRow = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: ${SPACE_PERCENTAGE}%;
  }
`;

const Key = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 2px;
  flex: 0 0 ${props => props.keyWidthPercentage}%;
  height: ${KEY_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #444;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  &:active {
    background-color: #eee;
  }
`;

const ShortKey = styled(Key)`
  height: ${SHORT_KEY_HEIGHT}px;
`;

const Keyboard = ({ onTapPrevious, onTapNext, onTapLetter, onTapDelete }) => (
  <Container>
    <KeyRow>
      <ShortKey
        onClick={onTapPrevious}
        keyWidthPercentage={ARROW_KEY_WIDTH_PERCENTAGE}
      >
        ←
      </ShortKey>
      <ShortKey
        onClick={onTapNext}
        keyWidthPercentage={ARROW_KEY_WIDTH_PERCENTAGE}
      >
        →
      </ShortKey>
    </KeyRow>
    <KeyRow>
      {"QWERTYUIOP".split("").map(letter => (
        <Key
          key={letter}
          keyWidthPercentage={TOP_KEY_WIDTH_PERCENTAGE}
          onClick={() => {
            onTapLetter(letter);
          }}
        >
          {letter}
        </Key>
      ))}
    </KeyRow>
    <KeyRow style={{ padding: `0 ${MIDDLE_PADDING_PERCENTAGE}%` }}>
      {"ASDFGHJKL".split("").map(letter => (
        <Key
          key={letter}
          keyWidthPercentage={MIDDLE_KEY_WIDTH_PERCENTAGE}
          onClick={() => {
            onTapLetter(letter);
          }}
        >
          {letter}
        </Key>
      ))}
    </KeyRow>
    <KeyRow style={{ paddingLeft: `${BOTTOM_PADDING_LEFT_PERCENTAGE}%` }}>
      {"ZXCVBNM".split("").map(letter => (
        <Key
          key={letter}
          keyWidthPercentage={BOTTOM_KEY_WIDTH_PERCENTAGE}
          onClick={() => {
            onTapLetter(letter);
          }}
        >
          {letter}
        </Key>
      ))}
      <Key
        keyWidthPercentage={DELETE_KEY_WIDTH_PERCENTAGE}
        onClick={onTapDelete}
      >
        Delete
      </Key>
    </KeyRow>
  </Container>
);

Keyboard.propTypes = {
  onTapDelete: PropTypes.func.isRequired,
  onTapLetter: PropTypes.func.isRequired,
  onTapNext: PropTypes.func.isRequired,
  onTapPrevious: PropTypes.func.isRequired
};

export default Keyboard;
