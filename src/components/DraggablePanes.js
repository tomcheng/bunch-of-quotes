import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import Animations, { cubicOut, cubicInOut } from "../utils/animations.js";

const TAP_TIME_THRESHOLD = 300;
const TAP_DISTANCE_THRESHOLD = 3;
const SWIPE_THRESHOLD = 30;
const DRAG_PAST_CONSTANT = 0.2;
const MAX_PANE_WIDTH = 720;

const Container = styled.div`
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  touch-action: none;
`;

const Panes = styled.div`
  height: 100%;
  display: flex;
`;

const Pane = styled.div`
  padding: 15px 20px;
  width: 33.333333333%;
  height: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

class DraggablePanes extends Component {
  static propTypes = {
    atStart: PropTypes.bool.isRequired,
    atEnd: PropTypes.bool.isRequired,
    leftPane: PropTypes.node.isRequired,
    middlePane: PropTypes.node.isRequired,
    rightPane: PropTypes.node.isRequired,
    onUpdateIndices: PropTypes.func.isRequired
  };

  state = {
    paneWidth: Math.min(window.innerWidth, MAX_PANE_WIDTH),
    paneOffset: Math.round(
      0.5 * (window.innerWidth - Math.min(window.innerWidth, MAX_PANE_WIDTH))
    ),
    isTouching: false,
    isAnimating: false,
    touchStartTime: null,
    touchStartX: null,
    touchX: null,
    tapDistanceThresholdMet: false,
    animationOffset: null
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleResize = () => {
    this.setState({
      paneWidth: Math.min(window.innerWidth, MAX_PANE_WIDTH),
      paneOffset: Math.round(
        0.5 * (window.innerWidth - Math.min(window.innerWidth, MAX_PANE_WIDTH))
      )
    });
  };

  handleKeyDown = evt => {
    const { currentIndex } = this.state;
    switch (evt.code) {
      case "ArrowRight":
      case "Space":
        evt.preventDefault();
        this.animateTo("next", { easing: cubicInOut });
        break;
      case "ArrowLeft":
        evt.preventDefault();
        if (currentIndex !== 0) {
          this.animateTo("previous", { easing: cubicInOut });
        }
        break;
      default:
        break;
    }
  };

  handleClick = evt => {
    evt.preventDefault();

    this.animateTo("next", { easing: cubicInOut });
  };

  handleTouchStart = evt => {
    evt.preventDefault();
    this.setState({
      isTouching: true,
      touchStartX: evt.touches[0].clientX,
      touchX: evt.touches[0].clientX,
      touchStartTime: new Date().getTime(),
      tapDistanceThresholdMet: false
    });
  };

  handleTouchMove = evt => {
    evt.preventDefault();
    const newTouchX = evt.touches[0].clientX;
    this.setState(state => ({
      ...state,
      touchX: newTouchX,
      tapDistanceThresholdMet:
        state.tapDistanceThresholdMet ||
        Math.abs(newTouchX - state.touchStartX) > TAP_DISTANCE_THRESHOLD
    }));
  };

  handleTouchEnd = () => {
    const { atStart, atEnd } = this.props;
    const {
      touchX,
      touchStartX,
      touchStartTime,
      tapDistanceThresholdMet
    } = this.state;
    const tapTimeThresholdMet =
      new Date().getTime() - touchStartTime > TAP_TIME_THRESHOLD;

    this.setState({ isTouching: false });

    if (!tapDistanceThresholdMet && !tapTimeThresholdMet) {
      return;
    }

    if (touchStartX - touchX > SWIPE_THRESHOLD && !atEnd) {
      this.animateTo("next");
    } else if (touchX - touchStartX > SWIPE_THRESHOLD && !atStart) {
      this.animateTo("previous");
    } else {
      this.animateTo("current", { easing: cubicInOut });
    }
  };

  animateTo = (destination, opts) => {
    const { easing } = {
      easing: cubicOut,
      ...opts
    };
    const { paneWidth, touchStartX, touchX } = this.state;
    const { atStart, onUpdateIndices } = this.props;
    const start =
      atStart && touchX > touchStartX
        ? -paneWidth + DRAG_PAST_CONSTANT * (touchX - touchStartX)
        : -paneWidth + touchX - touchStartX;
    const end =
      destination === "next"
        ? -2 * paneWidth
        : destination === "previous" ? 0 : -paneWidth;

    this.setState({
      isAnimating: true,
      animationOffset: start
    });

    Animations.animate({
      name: "panes",
      start,
      end,
      duration: 300,
      easing,
      onUpdate: x => {
        this.setState({ animationOffset: x });
      },
      onComplete: () => {
        this.setState({
          isAnimating: false,
          animationOffset: null
        });
        onUpdateIndices(destination);
      }
    });
  };

  render() {
    const { leftPane, middlePane, rightPane, atStart } = this.props;
    const {
      paneWidth,
      isTouching,
      touchStartX,
      touchX,
      isAnimating,
      animationOffset,
      paneOffset
    } = this.state;

    const offset = isAnimating
      ? animationOffset
      : isTouching
        ? atStart && touchX > touchStartX
          ? -paneWidth + DRAG_PAST_CONSTANT * (touchX - touchStartX)
          : -paneWidth + touchX - touchStartX
        : -paneWidth;

    const displacement = Math.abs(offset + paneWidth) / paneWidth;
    const direction = offset + paneWidth > 0 ? "previous" : "next";

    const currentOpacity = Math.min(1 - 1.5 * displacement, 1);
    const nextOpacity =
      direction === "next" ? 1.5 * Math.max(0, displacement - 0.33334) : 0;
    const previousOpacity =
      direction === "previous" ? 1.5 * Math.max(0, displacement - 0.33334) : 0;

    return (
      <Container
        onClick={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <Panes
          style={{
            transform: `translate3d(${offset + paneOffset}px, 0, 0)`,
            width: 3 * paneWidth
          }}
        >
          <Pane style={{ opacity: previousOpacity }}>
            {leftPane}
          </Pane>
          <Pane style={{ opacity: currentOpacity }}>
            {middlePane}
          </Pane>
          <Pane style={{ opacity: nextOpacity }}>
            {rightPane}
          </Pane>
        </Panes>
      </Container>
    );
  }
}

export default DraggablePanes;
