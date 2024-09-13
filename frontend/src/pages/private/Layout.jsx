import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard"; // Asegúrate de importar AdminDashboard

const Layout = () => {
  return (
    <div className="admin-panel">
      {/* Sidebar del dashboard */}
      <AdminDashboard />

      {/* Aquí solo se renderiza el contenido de las rutas hijas */}
      <div className="admin-content">
        <Outlet /> {/* Esto renderiza el componente correspondiente a la ruta */}
      </div>
    </div>
  );
};

export default Layout;
