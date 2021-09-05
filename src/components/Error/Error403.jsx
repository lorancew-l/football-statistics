import ErrorMessage from "./ErrorMessage";

import React from "react";

export default function Error403() {
  return (
    <ErrorMessage
      message="The resource you are looking for is restricted"
      status="403"
    />
  );
}
