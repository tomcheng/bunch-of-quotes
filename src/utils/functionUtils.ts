export const simpleMemoize = <A extends any[], R>(
  func: (...args: A) => R
): ((...args: A) => R) => {
  let lastArgs: any[] | null = null;
  let lastResult: R | null = null;

  return (...args: A) => {
    if (
      lastArgs !== null &&
      lastArgs.length === args.length &&
      args.every((value, index) => value === lastArgs?.[index])
    ) {
      return lastResult as R;
    }
    lastArgs = args;
    lastResult = func(...args);
    return lastResult as R;
  };
};
