export const simpleMemoize = <T extends (...args: any[]) => any>(func: T) => {
  let lastArgs: any[] | null = null;
  let lastResult: any[] | null = null;

  return (...args: any[]) => {
    if (
      lastArgs !== null &&
      lastArgs.length === args.length &&
      args.every((value, index) => value === lastArgs?.[index])
    ) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = func(...args);
    return lastResult;
  };
};
