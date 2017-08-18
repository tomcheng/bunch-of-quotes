import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "styled-components";
import Animations from "../utils/animations.js";
import Quote from "./Quote";

const TAP_TIME_THRESHOLD = 300;
const TAP_DISTANCE_THRESHOLD = 3;
const SWIPE_THRESHOLD = 30;

const Container = styled.div`
  align-items: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  box-sizing: border-box;
`;

const QuotePages = styled.div`
  width: 300%;
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
    windowWidth: window.innerWidth,
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
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ windowWidth: window.innerWidth });
  };

  handleClick = evt => {
    evt.preventDefault();
    this.animateToNext();
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
    const {
      touchX,
      touchStartX,
      touchStartTime,
      tapDistanceThresholdMet
    } = this.state;
    const tapTimeThresholdMet =
      new Date().getTime() - touchStartTime > TAP_TIME_THRESHOLD;
    const isTap = !tapDistanceThresholdMet && !tapTimeThresholdMet;

    this.setState({ isTouching: false });

    if (isTap) {
      return;
    }

    if (touchStartX - touchX > SWIPE_THRESHOLD) {
      this.animateToNext();
    } else if (touchX - touchStartX > SWIPE_THRESHOLD) {
      this.animateToPrevious();
    } else {
      this.animateToCurrent();
    }
  };

  animateToNext = () => {
    const { windowWidth, touchStartX, touchX } = this.state;
    const initialOffset = -windowWidth + touchX - touchStartX;

    this.setState({ isAnimating: true, animationOffset: initialOffset });

    Animations.animate({
      name: "quote",
      start: initialOffset,
      end: -2 * windowWidth,
      duration: 300,
      onUpdate: x => {
        this.setState({ animationOffset: x });
      },
      onComplete: () => {
        this.setState(
          state => ({
            ...state,
            isAnimating: false,
            animationOffset: null,
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
    });
  };

  animateToPrevious = () => {
    const { windowWidth, touchStartX, touchX } = this.state;
    const initialOffset = -windowWidth + touchX - touchStartX;

    Animations.animate({
      name: "quote",
      start: initialOffset,
      end: 0,
      duration: 300,
      onUpdate: x => {
        this.setState({ animationOffset: x });
      },
      onComplete: () => {
        this.setState(state => ({
          isAnimating: false,
          animationOffset: null,
          currentIndex:
            state.currentIndex === 0
              ? this.props.quotes.length - 1
              : state.currentIndex - 1
        }));
      }
    });
    this.setState({ isAnimating: true, animationOffset: initialOffset });
  };

  animateToCurrent = () => {
    const { windowWidth, touchStartX, touchX } = this.state;
    const initialOffset = -windowWidth + touchX - touchStartX;

    Animations.animate({
      name: "quote",
      start: initialOffset,
      end: -windowWidth,
      duration: 200,
      onUpdate: x => {
        this.setState({ animationOffset: x });
      },
      onComplete: () => {
        this.setState(state => ({
          isAnimating: false,
          animationOffset: null
        }));
      }
    });
    this.setState({ isAnimating: true, animationOffset: initialOffset });
  };

  render() {
    const { quotes } = this.props;
    const {
      currentIndex,
      windowWidth,
      isTouching,
      touchStartX,
      touchX,
      isAnimating,
      animationOffset,
      lastIndexSeen
    } = this.state;
    const previousIndex =
      currentIndex === 0 ? quotes.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === quotes.length - 1 ? 0 : currentIndex + 1;

    const offset = isAnimating
      ? animationOffset
      : isTouching ? -windowWidth + touchX - touchStartX : -windowWidth;

    return (
      <Container
        onClick={this.handleClick}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <QuotePages style={{ transform: `translate3d(${offset}px, 0, 0)` }}>
          <QuotePage>
            <QuoteContainer>
              <Quote key={previousIndex} quote={quotes[previousIndex]} seen />
            </QuoteContainer>
          </QuotePage>
          <QuotePage>
            <QuoteContainer>
              <Quote
                key={currentIndex}
                quote={quotes[currentIndex]}
                seen={lastIndexSeen >= currentIndex}
              />
            </QuoteContainer>
          </QuotePage>
          <QuotePage>
            <QuoteContainer>
              <Quote
                key={nextIndex}
                quote={quotes[nextIndex]}
                seen={lastIndexSeen >= nextIndex}
              />
            </QuoteContainer>
          </QuotePage>
        </QuotePages>
      </Container>
    );
  }
}

export default App;
