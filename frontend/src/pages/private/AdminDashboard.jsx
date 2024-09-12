import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import "./AdminDashboard.css";

const useDynamicTitle = () => {
  const location = useLocation();
  switch (location.pathname) {
    case "/dashboard/general":
      return "ajustes-generales";
    case "/dashboard/inicio":
      return "inicio";
    case "/dashboard/quienes-somos":
      return "quienes-somos";
    case "/dashboard/proximas-actividades":
      return "proximas-actividades";
    case "/dashboard/historico":
      return "historico";
    case "/dashboard/biblioteca":
      return "biblioteca";
    default:
      return "ajustes-generales";
  }
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const activeTab = useDynamicTitle();

  const handleTabChange = (path) => {
    navigate(path);
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
              onClick={() => handleTabChange("general", "/dashboard/general")}
            >
              AJUSTES GENERALES
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() => handleTabChange("inicio", "/dashboard/inicio")}
            >
              INICIO
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() =>
                handleTabChange("quienes-somos", "/dashboard/quienes-somos")
              }
            >
              ¿QUIÉNES SOMOS?
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() =>
                handleTabChange(
                  "proximas-actividades",
                  "/dashboard/proximas-actividades"
                )
              }
            >
              PRÓXIMAS ACTIVIDADES
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() =>
                handleTabChange("historico", "/dashboard/historico")
              }
            >
              HISTÓRICO
            </button>
          </li>
          <li>
            <button
              className="sidebar-btn"
              onClick={() =>
                handleTabChange("biblioteca", "/dashboard/biblioteca")
              }
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

      {/* Aquí se renderizará el contenido de las rutas hijas */}
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
