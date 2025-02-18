import React, { useState } from "react";

const MembershipModal = ({ isOpen, onClose, onVerify }) => {
  const [membershipID, setMembershipID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVerify = async () => {
    if (!membershipID.trim()) {
      setErrorMessage("Por favor, introduce tu ID de socio.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/checkCode/${membershipID}`
      );
      const data = await response.json();

      if (data.valid) {
        onVerify();
        onClose();
      } else {
        setErrorMessage("ID de socio no válido. Inténtalo de nuevo.");
      }
    } catch (error) {
      setErrorMessage("Error al verificar el ID. Inténtalo más tarde.");
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Acceso exclusivo para socios</h2>
        <p>Introduce tu ID de socio para continuar con la inscripción:</p>
        <input
          type="text"
          value={membershipID}
          onChange={(e) => setMembershipID(e.target.value)}
          placeholder="ID de socio"
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleVerify}>Verificar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default MembershipModal;
