import { fireEvent, render } from "@testing-library/react";
import React, { useMemo, useReducer } from "react";

import { renders, useRenderCounter } from "./useRenderCounter";

function TestComponent() {
  function reduce(count, action) {
    switch (action.type) {
      case "inc":
        return count + 1;
      default:
        return count;
    }
  }
  const [count, dispatch] = useReducer(reduce, 0);

  return (
    <div>
      <CounterView count={count} />
      {useMemo(
        () => (
          <IncrementButton dispatch={dispatch} />
        ),
        [dispatch]
      )}
    </div>
  );
}

function CounterView({ count }) {
  return <p>Count: {count}</p>;
}

function IncrementButton({ dispatch }) {
  useRenderCounter();
  return <button onClick={() => dispatch({ type: "inc" })}>Increment</button>;
}

// @ts-ignore
describe("IncrementButton", () => {
  // @ts-ignore
  it("only renders once", () => {
    const { getByText } = render(<TestComponent />);
    // @ts-ignore
    expect(renders.get()).toBe(1);
    fireEvent.click(getByText("Increment"));
    // @ts-ignore
    expect(renders.get()).toBe(1);
  });
});
