import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./History.css";
import ActivityFilter from "../components/filters/ActivityFilter";
import silueta from "../images/IlustracionLactancia.png";
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
    
        <button className="upcoming-activities" onClick={() => navigate('/actividades')}
        >Próximas actividades
        </button>
        </div>

        <ActivityFilter />

        <ol className="activity-container">

            {
              /* Map con las actividades recibidas en el fetch */
              activities.length > 0 ? (
                activities.map((activity,index) => (

                  <li key={index} className="activity" style={{ backgroundColor: getBackgroundColor(index) }}>
                    <p>{activity.image ? <img src={activity.image} alt={activity.summary} /> : 'imagen'}</p>
                    <h1 className="activity-title">{activity.summary || 'Título'}</h1>
                    <h2 className="activity-date">{activity.exactDate || 'Fecha'}</h2>
                    <p className="activity-location">{activity.location || 'Lugar'}</p>
                  </li>
                ))
              ) : (
                <p>No se han podido cargar las actividades pasadas</p>
              )
            }

            {/* //! Actividad de ejemplo */}
            <article className="activity">
                <img src= {silueta} alt="Logo Alma" className="activity-image" />
                <h1 className="activity-title">obradoiro: Alimentación complementaria</h1>
                {/* <p className="activity-author">Por Emma Enríquez (Nutricionista)</p> */}
                <h2 className="activity-date">Sábado 6 de xullo | 11h</h2>
                <p className="activity-location">Sala Municipal Celia e Esperanza Brañas Fernández, Culleredo</p>
                {/* <button className="activity-inscription">Inscribirse</button> */}

            </article>

        </ol>

      </main>
      <Footer />
    </div>
  );
};

const getBackgroundColor = (index) => {
  const colors = ['#b380b5', '#e0bb8e', '#c897b1'];
  return colors[index % colors.length];
};

export default History;
