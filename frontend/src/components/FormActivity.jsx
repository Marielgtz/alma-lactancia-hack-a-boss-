import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FormActivity.css";

const FormActivity = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedActivity = location.state?.activity; // Obtener la actividad seleccionada

  if (!selectedActivity) {
    return <p>No hay actividad seleccionada.</p>;
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isMember: "",
    acceptPrivacyPolicy: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    navigate("/actividades"); // Redirigir de vuelta a la página de actividades
  };

  return (
    <div className="registration-form">
      <small className="registration-title">Alma Lactancia</small>
      <h1 className="registration-h1">
        Rellena el formulario para inscribirte a esta actividad
      </h1>
      <h2 className="registration-summary">
        Obradoiro: {selectedActivity.summary}
      </h2>
      <p className="registration-date">{selectedActivity.exactDate}</p>
      <h2 className="registration-h2">FORMULARIO DE INSCRIPCIÓN</h2>
      <form onSubmit={handleSubmit}>
        <label className="registration-label">
          Nombre y apellidos:
          <input
            type="text"
            className="registration-input"
            name="name"
            placeholder="Nombre y apellidos"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="registration-label">
          Correo electrónico:
          <input
            type="email"
            className="registration-input"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label className="registration-label">
          Teléfono:
          <input
            type="tel"
            className="registration-input"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label className="registration-label">
          ¿Eres soci@?
          <div>
            <label className="registration-yes">
              <input
                type="radio"
                className="registration-check"
                name="isMember"
                value="yes"
                checked={formData.isMember === "yes"}
                onChange={handleChange}
                required
              />
              Sí
            </label>
            <label className="registration-no">
              <input
                type="radio"
                className="registration-check"
                name="isMember"
                value="no"
                checked={formData.isMember === "no"}
                onChange={handleChange}
                required
              />
              No
            </label>
          </div>
        </label>
        <label className="registration-label">
          <input
            type="checkbox"
            name="acceptPrivacyPolicy"
            checked={formData.acceptPrivacyPolicy}
            onChange={handleChange}
            required
          />
          He leído y acepto la política de privacidad
        </label>
        <button className="registration-button" type="submit">
          Inscribirse
        </button>
      </form>
    </div>
  );
};

export default FormActivity;
