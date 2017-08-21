import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import Animations, { cubicOut, cubicInOut } from "../utils/animations.js";
import Quote from "./Quote";

const TAP_TIME_THRESHOLD = 300;
const TAP_DISTANCE_THRESHOLD = 3;
const SWIPE_THRESHOLD = 30;
const DRAG_PAST_CONSTANT = 0.2;
const MAX_PANE_WIDTH = 720;

const Container = styled.div`
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
  box-sizing: border-box;
`;

const QuotePages = styled.div`
  height: 100%;
  display: flex;
`;

const QuotePage = styled.div`
  padding: 15px 20px;
  width: 33.333333333%;
  height: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const QuoteContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  @media (min-width: 400px) {
    width: 85%;
    padding: 0;
  }
`;

class App extends Component {
  static propTypes = {
    quotes: PropTypes.arrayOf(
      PropTypes.shape({
        author: PropTypes.shape({
          name: PropTypes.string.isRequired,
          time: PropTypes.string,
          position: PropTypes.string
        }).isRequired,
        quote: PropTypes.string.isRequired
      })
    ).isRequired
  };

  state = {
    currentIndex: 0,
    lastIndexSeen: 0,
    paneWidth: Math.min(window.innerWidth, MAX_PANE_WIDTH),
    isTouching: false,
    isAnimating: false,
    touchStartTime: null,
    touchStartX: null,
    touchX: null,
    tapDistanceThresholdMet: false,
    animationOffset: null,
    quoteShown: true
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
    this.setState({ paneWidth: Math.min(window.innerWidth, MAX_PANE_WIDTH) });
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

    if (!this.state.quoteShown) {
      return;
    }

    this.animateTo("next", { easing: cubicInOut });
  };

  handleTouchStart = evt => {
    this.setState({
      isTouching: true,
      touchStartX: evt.touches[0].clientX,
      touchX: evt.touches[0].clientX,
      touchStartTime: new Date().getTime(),
      tapDistanceThresholdMet: false
    });
  };

  handleTouchMove = evt => {
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
    const { quotes } = this.props;
    const {
      touchX,
      touchStartX,
      touchStartTime,
      tapDistanceThresholdMet,
      currentIndex
    } = this.state;
    const tapTimeThresholdMet =
      new Date().getTime() - touchStartTime > TAP_TIME_THRESHOLD;
    const atStart = currentIndex === 0;
    const atEnd = currentIndex === quotes.length - 1;

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
    const { paneWidth, touchStartX, touchX, currentIndex } = this.state;
    const atStart = currentIndex === 0;
    const start = atStart && touchX > touchStartX
      ? -paneWidth + DRAG_PAST_CONSTANT * (touchX - touchStartX)
      : -paneWidth + touchX - touchStartX;
    const end =
      destination === "next"
        ? -2 * paneWidth
        : destination === "previous" ? 0 : -paneWidth;

    this.setState({
      isAnimating: true,
      animationOffset: start,
      quoteShown: destination !== "next"
    });

    Animations.animate({
      name: "quote",
      start,
      end,
      duration: 300,
      easing,
      onUpdate: x => {
        this.setState({ animationOffset: x });
      },
      onComplete: () => {
        this.setState(state => ({
          ...state,
          isAnimating: false,
          animationOffset: null
        }));
        this.updateIndices(destination);
      }
    });
  };

  updateIndices = destination => {
    if (destination === "next") {
      this.setState(
        state => ({
          ...state,
          currentIndex:
            state.currentIndex === this.props.quotes.length - 1
              ? 0
              : state.currentIndex + 1
        }),
        () => {
          this.setState(state => ({
            ...state,
            lastIndexSeen: Math.max(state.lastIndexSeen, state.currentIndex)
          }));
        }
      );
    }

    if (destination === "previous") {
      this.setState(state => ({
        ...state,
        currentIndex:
          state.currentIndex === 0
            ? this.props.quotes.length - 1
            : state.currentIndex - 1
      }));
    }
  };

  handleCompleteQuoteAnimation = () => {
    this.setState({ quoteShown: true });
  };

  render() {
    const { quotes } = this.props;
    const {
      currentIndex,
      paneWidth,
      isTouching,
      touchStartX,
      touchX,
      isAnimating,
      animationOffset,
      lastIndexSeen
    } = this.state;
    const atStart = currentIndex === 0;
    const previousIndex = currentIndex - 1;
    const previousQuote = quotes[previousIndex];
    const nextIndex = currentIndex + 1;
    const nextQuote = quotes[nextIndex];

    const offset = isAnimating
      ? animationOffset
      : isTouching
        ? atStart && touchX > touchStartX
          ? -paneWidth + DRAG_PAST_CONSTANT * (touchX - touchStartX)
          : -paneWidth + touchX - touchStartX
        : -paneWidth;
    const displacement = Math.abs(offset + paneWidth) / paneWidth;
    const currentOpacity = Math.min(1 - 1.5 * displacement, 1);
    const direction = offset + paneWidth > 0 ? "previous" : "next";
    const previousOpacity = direction === "previous" ? 1.5 * Math.max(0, displacement - 0.33334) : 0;
    const nextOpacity = direction === "next" ? 1.5 * Math.max(0, displacement - 0.33334) : 0;

    return (
      <Container
        onClick={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
        style={{ width: paneWidth }}
      >
        <QuotePages style={{ transform: `translate3d(${offset}px, 0, 0)`, width: 3 * paneWidth }}>
          <QuotePage>
            <QuoteContainer style={{ opacity: previousOpacity }}>
              {previousQuote &&
                <Quote key={previousIndex} quote={previousQuote} seen />}
            </QuoteContainer>
          </QuotePage>
          <QuotePage>
            <QuoteContainer style={{ opacity: currentOpacity }}>
              <Quote
                key={currentIndex}
                quote={quotes[currentIndex]}
                seen={lastIndexSeen >= currentIndex}
                onCompleteAnimation={this.handleCompleteQuoteAnimation}
              />
            </QuoteContainer>
          </QuotePage>
          <QuotePage>
            <QuoteContainer style={{ opacity: nextOpacity }}>
              {nextQuote &&
                <Quote
                  key={nextIndex}
                  quote={nextQuote}
                  seen={lastIndexSeen >= nextIndex}
                />}
            </QuoteContainer>
          </QuotePage>
        </QuotePages>
      </Container>
    );
  }
}

export default App;
