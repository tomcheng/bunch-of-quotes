export const cubicOut = (x: number) => --x * x * x + 1;

export const cubicInOut = (x: number) => {
  // eslint-disable-next-line no-cond-assign
  if ((x *= 2) < 1) {
    return (1 / 2) * x * x * x;
  }
  return (1 / 2) * ((x -= 2) * x * x + 2);
};

type AnimationsType = {
  props: {
    animations: { [name: string]: { raf: number | null } };
  };
  registerStart: (name: string) => void;
  getCurrentTime: () => number;
  stop: (name: string) => void;
  animate: (args: {
    name: string;
    start: number;
    end: number;
    duration: number;
    easing: (x: number) => number;
    onUpdate: (x: number) => void;
    onComplete: () => void;
  }) => void;
};

const Animations: AnimationsType = {
  props: { animations: {} },

  registerStart(name) {
    const { animations } = this.props;

    if (animations[name]) {
      this.stop(name);
    }

    if (!animations[name]) {
      animations[name] = { raf: null };
    }
  },

  getCurrentTime() {
    return new Date().getTime();
  },

  stop(name) {
    const { animations } = this.props;

    if (animations[name] && animations[name].raf !== null) {
      window.cancelAnimationFrame(<number>animations[name].raf);
      delete animations[name];
    }
  },

  animate({
    name,
    start,
    end,
    duration,
    easing: customEasing,
    onUpdate,
    onComplete,
  }) {
    const easing = customEasing || cubicOut;
    const { animations } = this.props;
    const startTime = this.getCurrentTime();
    let timePassed;

    this.registerStart(name);

    const animationLoop = () => {
      if (animations[name]) {
        timePassed = this.getCurrentTime() - startTime;

        if (timePassed >= duration) {
          this.stop(name);
          onUpdate(end);
          if (onComplete) {
            onComplete();
          }
          return;
        }

        onUpdate((end - start) * easing(timePassed / duration) + start);

        animations[name].raf = window.requestAnimationFrame(animationLoop);
      }
    };
    animationLoop();
  },
};

export default Animations;
