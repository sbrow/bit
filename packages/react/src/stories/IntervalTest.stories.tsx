import { storiesOf } from "@storybook/react";
import React, { useState, memo } from "react";

import { useInterval } from "../components/use-interval-hook";

function IntervalTest(): JSX.Element {
  const [state, setState] = useState(0);
  const [stop, start] = useInterval(() => setState(x => x + 1), 1000);

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

storiesOf(IntervalTest.name, module).add("default", () => <IntervalTest />);
