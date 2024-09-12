import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const Layout = () => {
  return (
    <div>
      <AdminDashboard /> {/* Aquí se renderiza el sidebar */}
      <Outlet /> {/* Aquí se renderizan las rutas hijas */}
    </div>
  );
};

export default Layout;
