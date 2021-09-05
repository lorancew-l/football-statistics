import React from "react";

export default function Main({ children }) {
  return (
    <main className="main">
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </main>
  );
}
