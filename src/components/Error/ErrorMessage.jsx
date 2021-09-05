import React from "react";

export default function ErrorMessage({ status, message }) {
  return (
    <div className="error">
      <div className="error-status">{status}</div>
      <div className="error-message">{message}</div>
    </div>
  );
}
