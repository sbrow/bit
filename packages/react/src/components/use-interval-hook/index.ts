import { useEffect, useState } from "react";

/**
 * Runs `callback` every `timeout` milliseconds.
 * @param autoStart Whether or not to start the interval when
 * the calling component is mounted. Defaults to `true`.
 * @returns functions to manually stop and start the interval.
 */
export function useInterval(
  callback: TimerHandler,
  timeout: number,
  autoStart: boolean = true
) {
  const [running, setRunning] = useState(autoStart);

  function start() {
    if (!running) {
      setRunning(true);
    }
  }

  function stop() {
    if (running) {
      setRunning(false);
    }
  }

  useEffect(() => {
    if (running) {
      const int = setInterval(callback, timeout);
      return () => {
        clearInterval(int);
      };
    }
  }, [callback, timeout, running]);

  return [start, stop];
}
