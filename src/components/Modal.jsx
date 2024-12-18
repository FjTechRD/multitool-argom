import React from "react";
import "../css/components_css/Modal.css"; // Importa el CSS para el modal

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Si el modal está cerrado, no renderiza nada

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro
      >
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
