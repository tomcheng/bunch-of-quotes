import React, { useState } from "react";
import styled from "styled-components";
import Dropdown from "./Dropdown";

const Container = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
`;

type TriggerProps = {
  isMobile: boolean;
};

const Trigger = styled.div`
  padding: 15px;
  cursor: ${(props: TriggerProps) => (props.isMobile ? "auto" : "pointer")};
`;

type MenuProps = {
  isMobile: boolean;
  onClearGuesses: () => void;
  onRevealAnswer: () => void;
  onRevealLetter: () => void;
  onShowMistakes: () => void;
  onShowSolvedQuotes: () => void;
};

const Menu = ({
  isMobile,
  onClearGuesses,
  onRevealAnswer,
  onRevealLetter,
  onShowSolvedQuotes,
  onShowMistakes,
}: MenuProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <Container>
      <Dropdown
        options={[
          { label: "Show Solved Quotes", onClick: onShowSolvedQuotes },
          { label: "Clear Guesses", onClick: onClearGuesses },
          { label: "Show Mistakes", onClick: onShowMistakes },
          { label: "Reveal Letter", onClick: onRevealLetter },
          { label: "Reveal Answer", onClick: onRevealAnswer },
        ]}
        isOpen={dropdownOpen}
        onToggle={() => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        <Trigger isMobile={isMobile}>
          <i className="fa fa-ellipsis-v" />
        </Trigger>
      </Dropdown>
    </Container>
  );
};

export default Menu;
