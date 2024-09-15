import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./AdminDashboard.css";

const useDynamicTitle = () => {
  const location = useLocation();
  switch (location.pathname) {
    case "/dashboard/general":
      return "AJUSTES GENERALES";
    case "/dashboard/inicio":
      return "INICIO";
    case "/dashboard/quienes-somos":
      return "QUIÉNES SOMOS";
    case "/dashboard/actividades":
      return "PRÓXIMAS ACTIVIDADES";
    case "/dashboard/historico":
      return "HISTÓRICO";
    case "/dashboard/biblioteca":
      return "BIBLIOTECA";
    default:
      return "AJUSTES GENERALES";
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const activeTab = useDynamicTitle();

  const handleTabChange = (path) => {
    navigate(`/dashboard/${path}`);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>PANEL DE ADMINISTRACIÓN - {activeTab}</h1>
      </div>
      <aside className="sidebar">
        <ul>
          <li>
            <button
              className="sidebar-btn"
              onClick={() => handleTabChange("general")}
            >
              AJUSTES GENERALES
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() => handleTabChange("inicio")}
            >
              INICIO
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() => handleTabChange("quienes-somos")}
            >
              QUIÉNES SOMOS
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() => handleTabChange("actividades")}
            >
              PRÓXIMAS ACTIVIDADES
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() => handleTabChange("historico")}
            >
              HISTÓRICO
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() => handleTabChange("biblioteca")}
            >
              BIBLIOTECA
            </button>
          </li>
        </ul>

        <div className="footer">
          <button className="logout-btn">Cerrar sesión</button>
          <a href="/" className="back-to-site-link">
            Volver al sitio web de Alma Lactancia
          </a>
        </div>
      </aside>
    </div>
  );
};

export default AdminDashboard;
