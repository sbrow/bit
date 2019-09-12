import React, { ReactElement } from "react";

import Col from "@bit/react-bootstrap.react-bootstrap.col";
import Navbar from "@bit/react-bootstrap.react-bootstrap.navbar";

export interface VersionNumberProps {
  version: string;
  className?: string;
}

export function VersionNumber({
  version,
  className = "text-right",
}: VersionNumberProps): ReactElement {
  if (!className.match(/text-(center|left|right)/)) {
    // @ts-ignore
    className = `${className || ""} text-right`.trimLeft();
  }

  return (
    <Navbar className="fixed-bottom">
      <Col className={className}>v{version}</Col>
    </Navbar>
  );
}

export default VersionNumber;
