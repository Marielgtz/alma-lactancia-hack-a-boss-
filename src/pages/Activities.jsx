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

const Activities = ({ activities, setActivities }) => {
  const navigate = useNavigate();
  // const [filteredActivities, setFilteredActivites] = useState([])
  console.log('resultado', activities);
  // Función que obtiene la lista de actividades
  useEffect(() => {
    async function fetchCalendar(setActivities) {
      const calendarEvents = await getCalendarEvents();
      if (calendarEvents) {
        setActivities(calendarEvents);
      }
    }

    fetchCalendar(setActivities);
  }, []);

  // useEffect(() => {
  //     async function fetchActivities(endpoint, setActivities) {
  //         const fetchedActivities = await getPastEvents(endpoint)
  //         if (fetchedActivities) {
  //             const mockup = createMockupData(fetchedActivities)
  //             setActivities(mockup)
  //         }
  //     }

  //     fetchActivities('/get-filtered-activities', setActivities)
  // }, [])

  const handleEnrollClick = async (activity, activityNumber) => {
    if(activity.summary.includes("EVENTO CANCELADO")) return;
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/check-is-published/${
          activity.id
        }/${Number(activityNumber)}/true`
      );
      if (response.ok) {
        const data = await response.json();
        const isPublished = data.isPublished;
        if (!isPublished) {
          window.alert("No se han abierto las inscripciones");
          return;
        }
        console.log("Se ha encontrado un formulario publicado en esta ranura");
      } else {
        window.alert("No hay formulario publicado");
        return;
      }
    } catch (error) {
      console.log(`Ha ocurrido un error: ${error.message}`);
    }

    navigate(
      `/formulario-inscripcion/${activity.id}/${activityNumber}/${activity.summary}`,
      {
        state: { activity },
      }
    );
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

        {/* {<ActivityFilter
                    activities={activities}
                    setFilteredActivites={setFilteredActivites}
                />} */}

        <ol className="activity-container">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              // setPublishedActivity((prevData) => {
              //     const newData = [...prevData]
              //     newData.splice(index + 1, 1, activity)
              //     return newData
              // })
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
                    <p>{`Actividad número: ${index + 1}`}</p>
                    <h1 className="activities-title">
                      {activity.summary || "Título"}
                    </h1>
                    <h2 className="activities-date">
                      {formatDate(activity.start.dateTime) || "Fecha"}
                    </h2>
                    <p className="activities-decription">
                    {activity.description || "descripción"}
                    </p>

                    <p className="activities-location">
                      {activity.location || "Lugar"}
                    </p>
                    <button
                      className="activities-inscription"
                      onClick={() => handleEnrollClick(activity, index + 1)}
                    >
                      {
                      activity.summary.includes("EVENTO CANCELADO")
                      ? "Inscripciones cerradas"
                      : "Inscribirse"
                      }
                    </button>
                  </div>
                </li>
              );
            })
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
