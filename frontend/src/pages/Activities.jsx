
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Activities.css";
import ActivityFilter from "../components/filters/ActivityFilter";
import silueta from "../images/Alma_Lactancia_-_Foto_hero.jpg";
import {getCalendarEvents, getPastEvents} from '../services/api'
import { createMockupData } from "../services/mockUpService";
import { Calendar } from "react-big-calendar";

const Activities = () => {
  const navigate = useNavigate();
  // const [openInfo, setOpenInfo] = useState(null);
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivites] = useState([]);
  const [notFoundMessage, setNotFoundMessage] = useState("No se han podido cargar las actividades")

  // Función que obtiene la lista de actividades
  useEffect(() => {
    async function fetchActivities(endpoint, setActivities) {
      const fetchedActivities = await getPastEvents(endpoint);
      if (fetchedActivities) {
        const mockup = createMockupData(fetchedActivities)
        setActivities(mockup); 
      }
    }

    async function fetchCalendar(setActivities) {
      const calendarEvents = await getCalendarEvents();
      if (calendarEvents) {
        setActivities(calendarEvents)
        // console.log(calendarEvents);
      }
    }
    fetchCalendar(setActivities);    
    
    // fetchActivities('/get-filtered-activities', setActivities); // Antiguo fetch del histórico (excel)
  }, []);


    // Función que obtiene la lista de actividades
    useEffect(() => {
        async function fetchActivities(endpoint, setActivities) {
            const fetchedActivities = await getPastEvents(endpoint)
            if (fetchedActivities) {
                const mockup = createMockupData(fetchedActivities)
                setActivities(mockup)
            }
        }

        fetchActivities('/get-filtered-activities', setActivities)
    }, [])


    return (
        <div className='activity-page'>
            <Header />
            <main className='activity-main'>
                <div className='activity-header'>
                    <p className='activity-text'>Alma Lactancia</p>
                    <h1 className='activity-title'>Proxímas actividades</h1>
                    <p className='activity-description'>
                        Aquí podrás encontrar información sobre las próximas
                        reuniones, charlas y talleres que organizamos. Únete a
                        nosotros en estos eventos donde compartimos
                        conocimientos, experiencias y apoyo en un ambiente
                        acogedor y enriquecedor.

<ol className="activity-container">
          {
            /* Map con las actividades filtradas */
            filteredActivities.length > 0 ? (
              filteredActivities.map((activity, index) => (
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
                    <p className="activities-decription">
                      {activity.description || "Descripción"}
                    </p>
                    <p className="activities-date">
                      {activity.dateISO || "Fecha"}
                    </p>
                    <p className="activities-location">
                      {activity.location || "Lugar por definir"}

                    </p>

                    <button
                        className='upcoming-history'
                        onClick={() => navigate('/historico')}
                    >
                        Histórico
                    </button>

                </div>

                <ActivityFilter
                    activities={activities}
                    setFilteredActivites={setFilteredActivites}
                />

                <ol className='activity-container'>
                    {
                        /* Map con las actividades filtradas */
                        filteredActivities.length > 0 ? (
                            filteredActivities.map((activity, index) => (
                                <li key={index} className='activity-cards'>
                                    <div className='activity-content'>
                                        <div className='activity-image'>
                                            {activity.image ? (
                                                <img
                                                    src={activity.image}
                                                    alt={activity.summary}
                                                />
                                            ) : (
                                                <img
                                                    src={silueta}
                                                    alt='Imagen predeterminada'
                                                />
                                            )}
                                        </div>
                                        <h1 className='activities-title'>
                                            {activity.summary || 'Título'}
                                        </h1>
                                        <h2 className='activities-date'>
                                            {activity.exactDate || 'Fecha'}
                                        </h2>
                                        <p className='activities-location'>
                                            {activity.location || 'Lugar'}
                                        </p>
                                        <button className='activities-inscription'>
                                            Inscribirse
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>
                                No se han podido cargar las actividades pasadas
                            </p>
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
    )
}

                  </div>
                </li>
              ))
            ) : (
              <h1 className="no-activities-found">No se han encontrado actividades</h1>
            )
          }
          
        </ol>
      </main>
      <Footer />
    </div>
  );
};


export default Activities
