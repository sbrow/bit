import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import React, { useState } from "react";

import useInterval from "../components/use-interval-hook";

function Test(): JSX.Element {
  const [state, setState] = useState(0);
  const [stop, start] = useInterval(() => setState(x => x + 1), 1000);

  return (
    <div>
      <label htmlFor="time">time</label>
      <p id="time">{state}</p>
      <button onClick={() => start()}>start</button>
      <button onClick={() => stop()}>stop</button>
    </div>
  );
}

it("Timer works", () => {
  jest.useFakeTimers();
  const { getByLabelText, getByText } = render(<Test />);

  // Timer works normally
  const time = getByLabelText("time");
  expect(time).toHaveTextContent("0");
  jest.advanceTimersByTime(1000);
  expect(time).toHaveTextContent("1");

  // Stop button works
  fireEvent.click(getByText("stop"));
  jest.advanceTimersByTime(1000);
  expect(time).toHaveTextContent("1");

  // Start button works.
  fireEvent.click(getByText("start"));
  jest.advanceTimersByTime(1000);
  expect(time).toHaveTextContent("2");
});
