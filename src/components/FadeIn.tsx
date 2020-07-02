import React, { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: (args: { fadeInStyle: object }) => React.ReactElement;
  delay?: number;
  duration?: number;
};

const FadeIn = ({ children, delay = 0, duration = 300 }: FadeInProps) => {
  const [show, setShow] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [delay]);

  return children({
    fadeInStyle: {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: show ? 1 : 0,
    },
  });
};

export default FadeIn;
