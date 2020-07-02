import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { simpleMemoize } from "../utils/functionUtils";

const KEY_HEIGHT = 54;
const SPACE = 3;

const TOP_NUM_KEYS = 10;

const Container = styled.div`
  box-sizing: border-box;
  background-color: #919faa;
  padding: ${SPACE}px;
`;

const KeyRow = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  &:not(:first-child) {
    margin-top: ${SPACE}px;
  }
`;

const Key = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  opacity: ${(props) => (props.isFaded ? 0.8 : 1)};
  border-radius: 2px;
  flex: 0 0;
  height: ${KEY_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  user-select: none;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: ${SPACE}px;
  }
  &:active {
    background-color: #eee;
  }
`;

const getDimensions = simpleMemoize((fullWidth) => {
  const arrowKeyWidth = (fullWidth - 5 * SPACE) / 4;
  const keyWidth =
    (fullWidth - 2 * SPACE - (TOP_NUM_KEYS - 1) * SPACE) / TOP_NUM_KEYS;
  const deleteKeyWidth = 2 * keyWidth + SPACE;

  return {
    keyWidth,
    deleteKeyWidth,
    arrowKeyWidth,
  };
});

const Keyboard = ({
  fadedLetters,
  onTapDoublePrevious,
  onTapPrevious,
  onTapNext,
  onTapDoubleNext,
  onTapLetter,
  onTapDelete,
}) => {
  const [fullWidth, setFullWidth] = useState(window.innerWidth);
  const { keyWidth, deleteKeyWidth, arrowKeyWidth } = getDimensions(fullWidth);

  useEffect(() => {
    const handleResize = () => {
      setFullWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", this.handleResize);
    };
  }, []);

  return (
    <Container>
      <KeyRow>
        {"QWERTYUIOP".split("").map((letter) => (
          <Key
            key={letter}
            style={{ flexBasis: keyWidth + "px" }}
            isFaded={fadedLetters.includes(letter)}
            onClick={() => {
              onTapLetter(letter);
            }}
          >
            {letter}
          </Key>
        ))}
      </KeyRow>
      <KeyRow>
        {"ASDFGHJKL".split("").map((letter) => (
          <Key
            key={letter}
            style={{ flexBasis: keyWidth + "px" }}
            isFaded={fadedLetters.includes(letter)}
            onClick={() => {
              onTapLetter(letter);
            }}
          >
            {letter}
          </Key>
        ))}
      </KeyRow>
      <KeyRow style={{ justifyContent: "flex-end" }}>
        {"ZXCVBNM".split("").map((letter) => (
          <Key
            key={letter}
            style={{ flexBasis: keyWidth + "px" }}
            isFaded={fadedLetters.includes(letter)}
            onClick={() => {
              onTapLetter(letter);
            }}
          >
            {letter}
          </Key>
        ))}
        <Key style={{ flexBasis: deleteKeyWidth + "px" }} onClick={onTapDelete}>
          Delete
        </Key>
      </KeyRow>
      <KeyRow>
        <Key
          onClick={onTapDoublePrevious}
          style={{ flexBasis: arrowKeyWidth + "px" }}
        >
          <i className="fa fa-angle-double-left" />
        </Key>
        <Key
          onClick={onTapPrevious}
          style={{ flexBasis: arrowKeyWidth + "px" }}
        >
          <i className="fa fa-angle-left" />
        </Key>
        <Key onClick={onTapNext} style={{ flexBasis: arrowKeyWidth + "px" }}>
          <i className="fa fa-angle-right" />
        </Key>
        <Key
          onClick={onTapDoubleNext}
          style={{ flexBasis: arrowKeyWidth + "px" }}
        >
          <i className="fa fa-angle-double-right" />
        </Key>
      </KeyRow>{" "}
    </Container>
  );
};

Keyboard.propTypes = {
  fadedLetters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onTapDelete: PropTypes.func.isRequired,
  onTapDoubleNext: PropTypes.func.isRequired,
  onTapDoublePrevious: PropTypes.func.isRequired,
  onTapLetter: PropTypes.func.isRequired,
  onTapNext: PropTypes.func.isRequired,
  onTapPrevious: PropTypes.func.isRequired,
};

export default Keyboard;
