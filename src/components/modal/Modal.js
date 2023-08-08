import React from "react";

const Modal = ({ onClose, title, children }) => (
  <div className="modal">
    <div className="modal-content">
      <h3>{title}</h3>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Modal;
