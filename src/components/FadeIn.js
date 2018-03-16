import { Component } from "react";
import PropTypes from "prop-types";

class FadeIn extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number
  };

  static defaultProps = {
    delay: 0,
    duration: 300
  };

  state = { show: false };

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ show: true });
    }, this.props.delay);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { children, duration } = this.props;
    const { show } = this.state;

    return children({
      fadeInStyle: {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: show ? 1 : 0
      }
    });
  }
}

export default FadeIn;
