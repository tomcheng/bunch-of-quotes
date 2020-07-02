import React, { useEffect, useRef } from "react";
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

type DropdownContentProps = {
  isOpen: boolean;
};

const DropdownContent = styled.div`
  position: fixed;
  z-index: 1;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1), 0 5px 30px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 22px;
  opacity: ${(props: DropdownContentProps) => (props.isOpen ? 1 : 0)};
  transform: ${(props: DropdownContentProps) =>
    props.isOpen
      ? "scale3d(1, 1, 1) translate3d(0, 0, 0)"
      : "scale3d(0.9, 0.9, 1) translate3d(10%, -10%, 0)"};
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
  pointer-events: ${(props: DropdownContentProps) =>
    props.isOpen ? "auto" : "none"};
`;

const DropdownOption = styled.div`
  padding: 16px 20px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

type DropdownProps = {
  children: React.ReactNode;
  isOpen: boolean;
  options: {
    label: string;
    onClick: () => void;
  }[];
  onToggle: () => void;
};

const Dropdown = ({ children, isOpen, options, onToggle }: DropdownProps) => {
  const dropdownEl = useRef(document.createElement("div"));

  useEffect(() => {
    document.getElementsByTagName("body")[0].appendChild(dropdownEl.current);
  }, []);

  return (
    <>
      <div onClick={onToggle}>{children}</div>
      {createPortal(
        <>
          {isOpen && <Overlay onClick={onToggle} />}
          <DropdownContent
            isOpen={isOpen}
            style={{
              top: DISTANCE_FROM_EDGE,
              right: DISTANCE_FROM_EDGE,
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
        </>,
        dropdownEl.current
      )}
    </>
  );
};

export default Dropdown;
