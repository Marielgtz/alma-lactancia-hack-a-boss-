import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Activities.css";
import ActivityFilter from "../components/filters/ActivityFilter";
import silueta from "../images/Alma_Lactancia_-_Foto_hero.jpg";
import { getCalendarEvents, getPastEvents } from "../services/api";
import { createMockupData } from "../services/mockUpService";

const Activities = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivites] = useState([]);
  const [notFoundMessage, setNotFoundMessage] = useState(
    "No se han podido cargar las actividades"
  );

  // Estado para manejar el formulario de inscripción
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    isMember: "",
    acceptPrivacyPolicy: false,
  });
  const [selectedActivity, setSelectedActivity] = useState(null);

  // Función que obtiene la lista de actividades
  useEffect(() => {
    async function fetchCalendar(setActivities) {
      const calendarEvents = await getCalendarEvents();
      if (calendarEvents) {
        setActivities(calendarEvents);
        // console.log(calendarEvents);
      }
    }

    fetchCalendar(setActivities);
  }, []);

  useEffect(() => {
    async function fetchActivities(endpoint, setActivities) {
      const fetchedActivities = await getPastEvents(endpoint);
      if (fetchedActivities) {
        const mockup = createMockupData(fetchedActivities);
        setActivities(mockup);
      }
    }

    fetchActivities("/get-filtered-activities", setActivities);
  }, []);

  const handleEnrollClick = (activity) => {
    setSelectedActivity(activity); // Almacena la actividad seleccionada
    setShowForm(true); // Muestra el formulario
  };

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
    setShowForm(false); // Oculta el formulario después de enviar
    setFormData({
      name: "",
      email: "",
      phone: "",
      isMember: "",
      acceptPrivacyPolicy: false,
    }); // Reinicia el formulario
  };

  return (
    <div className="activity-page">
      <Header />
      <main className="activity-main">
        {/* Formulario de inscripción */}
        {showForm && selectedActivity && (
          <div className="registration-form">
            <small className="registration-title">Alma Lactancia</small>
            <h1 className="registration-h1">
              Rellena el formulario para inscribirte a esta actividad
            </h1>
            <h2 className="registration-summary">Obradoiro: {selectedActivity.summary}</h2>
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
              <button className="registration-button" type="submit">Inscribirse</button>
            </form>
          </div>
        )}
        <div className="activity-header">
          <p className="activity-text">Alma Lactancia</p>
          <h1 className="activity-title">Próximas actividades</h1>
          <p className="activity-description">
            Aquí podrás encontrar información sobre las próximas reuniones,
            charlas y talleres que organizamos. Únete a nosotros en estos
            eventos donde compartimos conocimientos, experiencias y apoyo en un
            ambiente acogedor y enriquecedor.
          </p>
        </div>

        <ActivityFilter
          activities={activities}
          setFilteredActivites={setFilteredActivites}
        />

        <ol className="activity-container">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity, index) => (
              <li key={index} className="activity-cards">
                <div className="activity-content">
                  <div className="activity-image">
                    {activity.image ? (
                      <img src={activity.image} alt={activity.summary} />
                    ) : (
                      <img src={silueta} alt="Imagen predeterminada" />
                    )}
                  </div>
                  <h1 className="activities-title">
                    {activity.summary || "Título"}
                  </h1>
                  <h2 className="activities-date">
                    {activity.exactDate || "Fecha"}
                  </h2>
                  <p className="activities-location">
                    {activity.location || "Lugar"}
                  </p>
                  <button
                    className="activities-inscription"
                    onClick={() => handleEnrollClick(activity)}
                  >
                    Inscribirse
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No se han podido cargar las actividades pasadas</p>
          )}
        </ol>
      </main>
      <Footer />
    </div>
  );
};

export default Activities;
