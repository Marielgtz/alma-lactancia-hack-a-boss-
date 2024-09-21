import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Activities.css";
import ActivityFilter from "../components/filters/ActivityFilter";
import silueta from "../images/Alma_Lactancia_-_Foto_hero.jpg";
import { getCalendarEvents, getPastEvents } from "../services/api";
import { createMockupData } from "../services/mockUpService";
import formatDate from "../utils/formatDate";

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
    async function fetchActivities(setActivities) {
      const fetchedActivities = await getCalendarEvents();
      if (fetchedActivities) {
        const mockup = createMockupData(fetchedActivities);
        setActivities(mockup);
      }
    }

    fetchActivities(setActivities); // Obtiene todas las actividades futuras
  }, []);

  const handleEnrollClick = (activity) => {
    setSelectedActivity(activity); // Almacena la actividad seleccionada
    navigate("/formulario-inscripcion", { state: { activity } });
  };

  return (
    <div className="activity-page">
      <Header />
      <main className="activity-main">
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

        {/* <ActivityFilter
          activities={activities}
          setFilteredActivites={setFilteredActivites}
        /> */}

        <ol className="activity-container">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              activity.parsedDate = formatDate(activity.start.dateTime)

              return (
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
                    {activity.parsedDate || "Fecha"}
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
            )})
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
