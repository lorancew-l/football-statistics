import React from "react";
import ReactDOM from "react-dom";

export default function ModalOverlay({ children, close }) {
  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={close}>
      {children}
    </div>,
    modalRoot
  );
}
