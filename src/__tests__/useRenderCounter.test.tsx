import { fireEvent, render } from "@testing-library/react";
import React, { Dispatch, useMemo, useReducer } from "react";

import {
  renders,
  useRenderCounter,
} from "../components/render-count-hook/useRenderCounter";

function TestComponent(): JSX.Element {
  function reduce(count: number, action: { type: string }): number {
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

function CounterView({ count }: { count: number }): JSX.Element {
  return <p>Count: {count}</p>;
}

function IncrementButton({
  dispatch,
}: {
  dispatch: Dispatch<any>;
}): JSX.Element {
  useRenderCounter();
  return <button onClick={() => dispatch({ type: "inc" })}>Increment</button>;
}

describe("IncrementButton", () => {
  it("only renders once", () => {
    const { getByText } = render(<TestComponent />);
    expect(renders.get()).toBe(1);
    fireEvent.click(getByText("Increment"));
    expect(renders.get()).toBe(1);
  });
});
