import React from "react";

import Col from "@bit/react-bootstrap.react-bootstrap.col";
import Navbar from "@bit/react-bootstrap.react-bootstrap.navbar";

export interface VersionNumberProps {
  version: string;
  className?: string;
}

export function VersionNumber({
  version,
  className = "text-right",
}: VersionNumberProps): JSX.Element {
  if (!className.match(/text-(center|left|right)/)) {
    className = `${className || ""} text-right`.trimLeft();
  }

  let versionString = `v${version}`;
  return (
    <Navbar className="fixed-bottom">
      <Col className={className}>{versionString}</Col>
    </Navbar>
  );
}
