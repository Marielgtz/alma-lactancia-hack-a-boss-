import React, { useState } from "react";
import "./AdminPanel.css";
import logo from "../images/logo-alma.png";

const AdminPanel = () => {
  const { activeTab, setActiveTab } = useState("AJUSTES GENERALES");
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="admin-panel">
    <div className="admin-header"></div>
      <aside className="sidebar">
        <ul>
          <li>
            <button className="sidebar-btn">AJUSTES GENERALES</button>
          </li>
          <li>
            <button className="sidebar-btn">INICIO</button>
          </li>
          <li>
            <button className="sidebar-btn">¿QUIÉNES SOMOS?</button>
          </li>
          <li>
            <button className="sidebar-btn">PRÓXIMAS ACTIVIDADES</button>
          </li>
          <li>
            <button className="sidebar-btn">HISTÓRICO</button>
          </li>
          <li>
            <button className="sidebar-btn">BIBLIOTECA</button>
          </li>
        </ul>

        <div className="footer">
          <button className="logout-btn">Cerrar sesión</button>
          <a href="/" className="back-to-site-link">
            Volver al sitio web de Alma Lactancia
          </a>
        </div>
      </aside>

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
    </div>
  );
};

export default AdminPanel;
