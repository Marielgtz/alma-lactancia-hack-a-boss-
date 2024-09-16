import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormActivity from "../components/FormActivity";
import "./FormActivityPage.css";

const FormActivityPage = () => {
  const location = useLocation();
  const selectedActivity = location.state?.activity; // Obtiene la actividad seleccionada
  const event = location.state?.event; // Obtiene el evento seleccionado

  return (
    <div className="register-page">
      <Header />
      <main className="register-main">
        <FormActivity selectedActivity={selectedActivity} /> {/* Pasa la actividad seleccionada al formulario */}
      </main>
      <Footer />
    </div>
  );
};

export default FormActivityPage;
