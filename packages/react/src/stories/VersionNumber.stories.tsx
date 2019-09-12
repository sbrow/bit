import { storiesOf } from "@storybook/react";
import React from "react";

// import { Button } from "react-bootstrap";
import { VersionNumber } from "../components/version-number";

import "bootstrap/dist/css/bootstrap.css";

storiesOf("VersionNumber", module).add("default", () => (
  <VersionNumber version="1.0.0" />
));

storiesOf("button", module)
  .add("normal", () => <button className="button">Button</button>)
  .add("disabled", () => (
    <button className="button" disabled={true}>
      Button
    </button>
  ));
