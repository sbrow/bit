import { storiesOf } from "@storybook/react";
import React from "react";

import { VersionNumber } from "../components/version-number";

import "bootstrap/dist/css/bootstrap.css";

storiesOf("VersionNumber", module).add("default", () => (
  <VersionNumber version="1.0.0" />
));
