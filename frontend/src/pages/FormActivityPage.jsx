import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormDisplay from "../components/FormDisplay";
import "./FormActivityPage.css";

const FormActivityPage = () => {
  const location = useLocation();
  const selectedActivity = location.state?.activity; // Obtiene la actividad seleccionada
  const event = location.state?.event; // Obtiene el evento seleccionado
  const publishedForm = location.state?.publishedForm; // Obtiene publishedForm si está disponible

  return (
    <div className="register-page">
      <Header />
      <main className="register-main">
        <FormDisplay publishedForm={publishedForm} selectedActivity={selectedActivity} /> {/* Pasa la actividad seleccionada al formulario */}
      </main>
      <Footer />
    </div>
  );
};

export default FormActivityPage;
