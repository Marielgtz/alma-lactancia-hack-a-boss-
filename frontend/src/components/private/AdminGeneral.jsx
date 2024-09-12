import React from "react";
import logo from "../../images/logo-alma.png";
import "./AdminGeneral.css";

const AdminGeneral = () => {
  return (
    <main className="settings-content">
      <div className="logo-section">
        <h3>Logotipo</h3>
        <img src={logo} alt="Logo" className="logo-image" />
        <div className="logo-buttons">
          <button>Eliminar</button>
          <button>Cambiar el logotipo</button>
        </div>
      </div>

      <form className="social-links-form">
        <label>
          Link de Instagram
          <input type="text" placeholder="Nueva dirección de Instagram" />
          <button>Guardar</button>
        </label>

        <label>
          Link de Facebook
          <input type="text" placeholder="Nueva dirección de Facebook" />
          <button>Guardar</button>
        </label>

        <label>
          Correo Electrónico
          <input
            type="email"
            placeholder="Nueva dirección de correo electrónico"
          />
          <button>Guardar</button>
        </label>
      </form>
    </main>
  );
};

export default AdminGeneral;
