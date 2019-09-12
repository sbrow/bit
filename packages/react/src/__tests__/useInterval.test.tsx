import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import React, { useState } from "react";

import useInterval from "../components/use-interval-hook";
import { useRenderCounter } from "../components/render-count-hook";

const interval = 1000;

function Test(): JSX.Element {
  useRenderCounter();
  const [state, setState] = useState(0);
  const [stop, start] = useInterval(() => setState(x => x + 1), interval);

  return (
    <div>
      <label htmlFor="time">time</label>
      <p id="time">{state}</p>
      <button onClick={() => start()}>start</button>
      <button onClick={() => stop()}>stop</button>
      <button onClick={() => setState(0)}>reset</button>
    </div>
  );
}

beforeAll(() => {
  jest.useFakeTimers();
});
afterAll(() => {
  jest.useRealTimers();
});
it("Timer works", () => {
  const { getByLabelText, getByText } = render(<Test />);

  // Timer works normally
  const time = getByLabelText("time");
  expect(time).toHaveTextContent("0");
  jest.advanceTimersByTime(interval);
  expect(time).toHaveTextContent("1");

  // Stop button works
  fireEvent.click(getByText("stop"));
  jest.advanceTimersByTime(interval);
  expect(time).toHaveTextContent("1");

  // Start button works.
  fireEvent.click(getByText("start"));
  jest.advanceTimersByTime(interval);
  expect(time).toHaveTextContent("2");
});

it.only("doesn't restart interval on re-render", () => {
  const { getByLabelText, getByText } = render(<Test />);
  const time = getByLabelText("time");

  jest.advanceTimersByTime(interval);
  fireEvent.click(getByText("stop"));
  jest.advanceTimersByTime(interval);
  expect(time).toHaveTextContent("1");

  fireEvent.click(getByText("reset"));
  jest.advanceTimersByTime(interval);
  expect(time).toHaveTextContent("0");
});
