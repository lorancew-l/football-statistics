import React from "react";

export default function Loader() {
  return (
    <div
      className="loader"
      exit={{ opacity: 0 }}
      transition={{ duration: "3s" }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
