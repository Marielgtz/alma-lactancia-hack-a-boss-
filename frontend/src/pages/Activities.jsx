import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Activities.css";
import ActivityFilter from "../components/filters/ActivityFilter";
import silueta from "../images/Alma_Lactancia_-_Foto_hero.jpg";
import { getPastEvents } from "../services/api";

const Activities = () => {
  const navigate = useNavigate();
  const [openInfo, setOpenInfo] = useState(null);
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivites] = useState([]);

  const toggleInfo = (info) => {
    setOpenInfo(info === openInfo ? null : info);
  };

  //TODO IMPLEMENTANDO EL FETCH

  // Accede a env y crea url de fetch

  //TODO Pasarlo a dentro del componente - Pasar como param la URL (histórico o proximas acts)
  useEffect(() => {
    async function fetchActivities(endpoint) {
      const fetchedActivities = await getPastEvents(endpoint);
      if (fetchedActivities) {
        // ! ========   Mockup para testeo   =============================================
        // console.log(fetchedActivities);
        fetchedActivities[4].access = "member"
        fetchedActivities[5].access = "member"
        fetchedActivities[7].access = "member"
        fetchedActivities[10].location = "Coruña"
        //! ======================================================
        setActivities(fetchedActivities); 
      }
    }

    fetchActivities('/get-filtered-activities');
  }, []);

  return (
    <div className="activity-page">
      <Header />
      <main className="activity-main">
        <div className="activity-header">
          <p className="activity-text">Alma Lactancia</p>
          <h1 className="activity-title">Proxímas actividades</h1>
          <p className="activity-description">
            Aquí podrás encontrar información sobre las próximas reuniones,
            charlas y talleres que organizamos. Únete a nosotros en estos
            eventos donde compartimos conocimientos, experiencias y apoyo en un
            ambiente acogedor y enriquecedor.
          </p>

          <button
            className="upcoming-history"
            onClick={() => navigate("/historico")}
          >
            Histórico
          </button>
        </div>

        <ActivityFilter
          activities={activities}
          setFilteredActivites={setFilteredActivites}
        />

<ol className="activity-container">
          {
            /* Map con las actividades recibidas en el fetch */
            activities.length > 0 ? (
              activities.map((activity, index) => (
                <li
                  key={index}
                  className="activity-cards"
                >
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
                    <button className="activities-inscription">
                      Inscribirse
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p>No se han podido cargar las actividades pasadas</p>
            )
          }

          {/* //! Actividad de ejemplo */}
          {/* <article className="activity">
            <img src={silueta} alt="Logo Alma" className="activities-image" />
            <h1 className="activities-title">
              obradoiro: Alimentación complementaria
            </h1>
            <h2 className="activities-date">Sábado 6 de xullo | 11h</h2>
            <p className="activities-location">
              Sala Municipal Celia e Esperanza Brañas Fernández, Culleredo
            </p>
            {<button className="activities-inscription">Inscribirse</button>}
          </article> */}
        </ol>
      </main>
      <Footer />
    </div>
  );
};

export default Activities;
