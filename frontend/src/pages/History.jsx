import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./History.css";
import ActivityFilter from "../components/filters/ActivityFilter";
import silueta from "../images/Alma_Lactancia_-_Foto_hero.jpg";
import { getPastEvents } from "../services/api";

const History = () => {
  const navigate = useNavigate();
  const [openInfo, setOpenInfo] = useState(null);
  const [activities, setActivities] = useState([]);

  const toggleInfo = (info) => {
    setOpenInfo(info === openInfo ? null : info);
  };

  //TODO IMPLEMENTANDO EL FETCH

  // Accede a env y crea url de fetch

  //TODO Pasarlo a dentro del componente - Pasar como param la URL (histórico o proximas acts)
  useEffect(() => {
    async function fetchActivities() {
      const fetchedActivities = await getPastEvents();
      if (fetchedActivities) {
        setActivities(fetchedActivities);
      }
    }

    fetchActivities();
  }, []);

  return (
    <div className="history-page">
      <Header />
      <main className="history-main">
        <div className="history-header">
          <p className="history-text">Alma Lactancia</p>
          <h1 className="history-title">Histórico</h1>
          <p className="history-description">
            En esta sección encontrarás un registro detallado de todas las
            actividades realizadas en Alma Lactancia. Desde reuniones hasta
            charlas informativas, este histórico recopila los eventos que han
            marcado nuestra trayectoria y compromiso con las familias.
          </p>

          <button
            className="upcoming-activities"
            onClick={() => navigate("/actividades")}
          >
            Próximas actividades
          </button>
        </div>

        <ActivityFilter />

        <ol className="activity-container">
          {
            /* Map con las actividades recibidas en el fetch */
            activities.length > 0 ? (
              activities.map((activity, index) => (
                <li
                  key={index}
                  className="activity"
                  style={{ backgroundColor: getBackgroundColor(index) }}
                >
                  <div className="activity-image">
                      {activity.image ? (
                        <img src={activity.image} alt={activity.summary} />
                      ) : (
                        <img src={silueta} alt="Imagen predeterminada" />
                      )}
                    </div>
                  <h1 className="activities-title"
                  style={{ color: getColor(index) }}
                  >
                    {activity.summary || "Título"}
                  </h1>
                  <h2 className="activities-date">
                    {activity.exactDate || "Fecha"}
                  </h2>
                  <p className="activities-location">
                    {activity.location || "Lugar"}
                  </p>
                </li>
              ))
            ) : (
              <p>No se han podido cargar las actividades pasadas</p>
            )
          }
        </ol>
      </main>
      <Footer />
    </div>
  );
};

const getBackgroundColor = (index) => {
  const colors = ["#b380b5", "#e0bb8e"];
  return colors[index % colors.length];
};
const getColor = (index) => {
  const colors = ["#e0bb8e", "#b380b5"];
  return colors[index % colors.length];
};

export default History;
