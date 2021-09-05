import ErrorMessage from "./ErrorMessage";

import React from "react";

export default function Error403() {
  return (
    <ErrorMessage
      message="Too many requests. Wait a minute and try again"
      status="429"
    />
  );
}
