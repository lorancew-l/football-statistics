import React from "react";
import ErrorMessage from "./ErrorMessage";
import Error403 from "./Error403";
import Error429 from "./Error429";

export default function ErrorSwitch({ status }) {
  switch (status) {
    case "403":
      return <Error403 />;
    case "429":
      return <Error429 />;
    default:
      return (
        <ErrorMessage
          status={status}
          message="Something went wrong. Try again later"
        />
      );
  }
}
