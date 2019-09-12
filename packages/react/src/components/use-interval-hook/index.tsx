import { useEffect, useState, useRef } from "react";

export type StopFunction = () => void;
export type StartFunction = () => void;

/**
 * Runs `callback` every `timeout` milliseconds.
 *
 * @returns functions to manually stop and start the interval.
 */
export function useInterval(
  callback: TimerHandler,
  timeout: number,
  deps: ReadonlyArray<any> = [callback, timeout]
): [StopFunction, StartFunction] {
  const int = useRef(0);
  // const [state, setState] = useState<number | undefined>(0);

  function stop(): void {
    clearInterval(int.current);
    // clearInterval(state);
    int.current = undefined;
    // setState(undefined);
  }

  function start(): void {
    stop();
    int.current = setInterval(callback, timeout);
    // setState(setInterval(callback, timeout));
  }

  useEffect(() => {
    if (int.current !== undefined) {
      start();
    }

    return stop;
  }, [callback, timeout]);

  return [stop, start];
}

export default useInterval;
