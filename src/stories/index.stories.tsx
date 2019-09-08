import { storiesOf } from "@storybook/react";
import React from "react";

import { useRenderCounter } from "../components/render-count-hook";

function Test() {
  const count = useRenderCounter();
  return <p>I have rendered {count} times, nice right?</p>;
}
storiesOf("hook", module).add("thing", () => <Test />);
