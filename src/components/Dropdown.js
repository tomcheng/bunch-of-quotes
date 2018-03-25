import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styled from "styled-components";

const DISTANCE_FROM_EDGE = 3;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
`;

const DropdownContent = styled.div`
  position: fixed;
  z-index: 1;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1), 0 5px 30px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 22px;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transform: ${props =>
    props.isOpen
      ? "scale3d(1, 1, 1) translate3d(0, 0, 0)"
      : "scale3d(0.9, 0.9, 1) translate3d(10%, -10%, 0)"};
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
  pointer-events: ${props => (props.isOpen ? "auto" : "none")};
`;

const DropdownOption = styled.div`
  padding: 16px 20px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
      })
    ).isRequired,
    onToggle: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.dropdownEl = document.createElement("div");
    document.getElementsByTagName("body")[0].appendChild(this.dropdownEl);

    this.state = {
      dimensions: { width: 0, height: 0, top: 0, right: 0 },
      isMeasured: false
    };
  }

  handleResize = ({ bounds }) => {
    this.setState({ dimensions: bounds, isMeasured: true });
  };

  renderDropdownContent = () => {
    const { isOpen, onToggle, options } = this.props;

    return createPortal(
      <Fragment>
        {isOpen && <Overlay onClick={onToggle} />}
        <DropdownContent
          isOpen={isOpen}
          style={{
            top: DISTANCE_FROM_EDGE,
            right: DISTANCE_FROM_EDGE
          }}
        >
          {options.map(({ label, onClick }) => (
            <DropdownOption
              key={label}
              onClick={() => {
                onToggle();
                onClick();
              }}
            >
              {label}
            </DropdownOption>
          ))}
        </DropdownContent>
      </Fragment>,
      this.dropdownEl
    );
  };

  render() {
    const { children, onToggle } = this.props;

    return (
      <Fragment>
        <div onClick={onToggle}>{children}</div>
        {this.renderDropdownContent()}
      </Fragment>
    );
  }
}

export default Dropdown;
