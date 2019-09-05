import { useEffect } from "react";

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
  let int: number = 0;

  function stop(): void {
    clearInterval(int);
  }

  function start(): void {
    stop();
    int = setInterval(callback, timeout);
  }

  useEffect(() => {
    start();

    return stop;
  }, deps);

  return [stop, start];
}

export default useInterval;
