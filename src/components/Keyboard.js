import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { simpleMemoize } from "../utils/functionUtils";

const KEY_HEIGHT = 54;
const SHORT_KEY_HEIGHT = 42;
const SPACE = 4;

const TOP_NUM_KEYS = 10;
const MIDDLE_NUM_KEYS = 9;
const BOTTOM_NUM_KEYS = 7;

const Container = styled.div`
  box-sizing: border-box;
  background-color: #919faa;
  padding: ${props => props.spacePercentage}%;
`;

const KeyRow = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: ${props => props.spacePercentage}%;
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

class Keyboard extends Component {
  static propTypes = {
    onTapDelete: PropTypes.func.isRequired,
    onTapLetter: PropTypes.func.isRequired,
    onTapNext: PropTypes.func.isRequired,
    onTapPrevious: PropTypes.func.isRequired
  };

  state = { fullWidth: window.innerWidth };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ fullWidth: window.innerWidth });
  };

  getDimensions = simpleMemoize(fullWidth => {
    const spacePercentage = SPACE / fullWidth * 100;

    const arrowKeyWidthPercentage =
      (fullWidth - 3 * SPACE) / 2 / (fullWidth - 2 * SPACE) * 100;

    const keyWidth =
      (fullWidth - 2 * SPACE - (TOP_NUM_KEYS - 1) * SPACE) / TOP_NUM_KEYS;
    const topKeyWidthPercentage = keyWidth / (fullWidth - 2 * SPACE) * 100;

    const middlePadding =
      (fullWidth -
        2 * SPACE -
        MIDDLE_NUM_KEYS * keyWidth -
        (MIDDLE_NUM_KEYS - 1) * SPACE) /
      2;
    const middlePaddingPercentage =
      middlePadding / (fullWidth - 2 * SPACE) * 100;
    const middleKeyWidthPercentage =
      keyWidth / (fullWidth - 2 * SPACE - 2 * middlePadding) * 100;

    const deleteKeyWidth = 2 * keyWidth + SPACE;
    const bottomPaddingLeft =
      fullWidth -
      2 * SPACE -
      BOTTOM_NUM_KEYS * keyWidth -
      BOTTOM_NUM_KEYS * SPACE -
      deleteKeyWidth;
    const bottomPaddingLeftPercentage =
      bottomPaddingLeft / (fullWidth - 2 * SPACE) * 100;
    const bottomKeyWidthPercentage =
      keyWidth / (fullWidth - 2 * SPACE - bottomPaddingLeft) * 100;
    const deleteKeyWidthPercentage =
      deleteKeyWidth / (fullWidth - 2 * SPACE - bottomPaddingLeft) * 100;

    return {
      spacePercentage,
      arrowKeyWidthPercentage,
      topKeyWidthPercentage,
      middlePaddingPercentage,
      middleKeyWidthPercentage,
      bottomPaddingLeftPercentage,
      bottomKeyWidthPercentage,
      deleteKeyWidthPercentage
    };
  });

  render() {
    const { onTapPrevious, onTapNext, onTapLetter, onTapDelete } = this.props;
    const { fullWidth } = this.state;
    const {
      spacePercentage,
      arrowKeyWidthPercentage,
      topKeyWidthPercentage,
      middlePaddingPercentage,
      middleKeyWidthPercentage,
      bottomPaddingLeftPercentage,
      bottomKeyWidthPercentage,
      deleteKeyWidthPercentage
    } = this.getDimensions(fullWidth);

    return (
      <Container spacePercentage={spacePercentage}>
        <KeyRow spacePercentage={spacePercentage}>
          <ShortKey
            onClick={onTapPrevious}
            keyWidthPercentage={arrowKeyWidthPercentage}
          >
            ←
          </ShortKey>
          <ShortKey
            onClick={onTapNext}
            keyWidthPercentage={arrowKeyWidthPercentage}
          >
            →
          </ShortKey>
        </KeyRow>
        <KeyRow spacePercentage={spacePercentage}>
          {"QWERTYUIOP".split("").map(letter => (
            <Key
              key={letter}
              keyWidthPercentage={topKeyWidthPercentage}
              onClick={() => {
                onTapLetter(letter);
              }}
            >
              {letter}
            </Key>
          ))}
        </KeyRow>
        <KeyRow
          spacePercentage={spacePercentage}
          style={{ padding: `0 ${middlePaddingPercentage}%` }}
        >
          {"ASDFGHJKL".split("").map(letter => (
            <Key
              key={letter}
              keyWidthPercentage={middleKeyWidthPercentage}
              onClick={() => {
                onTapLetter(letter);
              }}
            >
              {letter}
            </Key>
          ))}
        </KeyRow>
        <KeyRow
          spacePercentage={spacePercentage}
          style={{ paddingLeft: `${bottomPaddingLeftPercentage}%` }}
        >
          {"ZXCVBNM".split("").map(letter => (
            <Key
              key={letter}
              keyWidthPercentage={bottomKeyWidthPercentage}
              onClick={() => {
                onTapLetter(letter);
              }}
            >
              {letter}
            </Key>
          ))}
          <Key
            keyWidthPercentage={deleteKeyWidthPercentage}
            onClick={onTapDelete}
          >
            Delete
          </Key>
        </KeyRow>
      </Container>
    );
  }
}

export default Keyboard;
