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
import { useTranslation } from "react-i18next";

const Activities = ({ activities, setActivities }) => {
  const { i18n } = useTranslation();
  //Esto es para el condicional de los datos dinámicos traducidos llegados desde el backend:
  const currentLang = i18n.language;

  const navigate = useNavigate();

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

  const handleEnrollClick = async (activity, activityNumber) => {
    if (activity.summary.includes("EVENTO CANCELADO")) return;

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

        <ol className="activity-container">
          {activities.length > 0 ? (
            activities.map((activity, index) => {
              console.log(activity);
              // Calcular la duración
              const start = new Date(activity.start.dateTime);
              const end = new Date(activity.end.dateTime);

              const durationInMinutes = Math.floor((end - start) / (1000 * 60));
              const hours = Math.floor(durationInMinutes / 60);
              const minutes = durationInMinutes % 60;

              const durationString =
                hours > 0 ? `${hours} h ${minutes} m` : `${minutes} minutos`;

              return (
                <li key={index} className="activity-cards">
                  <div className="activity-content">
                    <div className="activity-image">
                      {activity.extendedProperties.private.image &&
                      activity.extendedProperties.private.image !=
                        "sin imagen" ? (
                        <img
                          src={activity.extendedProperties.private.image}
                          alt={activity.summary}
                        />
                      ) : (
                        <img src={silueta} alt="Imagen predeterminada" />
                      )}
                    </div>
                    <h1 className="activities-title">
                      {currentLang === "es"
                        ? activity.summary || "Título"
                        : activity.extendedProperties.private.glSummary ||
                          activity.summary ||
                          "Título"}
                    </h1>
                    <p className="activities-decription">
                      {currentLang === "es"
                        ? activity.description || "descripción"
                        : activity.extendedProperties.private.glDescription ||
                          activity.description ||
                          "descripción"}
                    </p>
                    <p className="activities-location">
                      {activity.location || "Lugar"}
                    </p>

                    <h2 className="activities-date">
                      {currentLang === "es"
                        ? formatDate(activity.start.dateTime, null, "es") ||
                          "Fecha"
                        : formatDate(activity.start.dateTime, null, "gl") ||
                          "Fecha"}
                    </h2>
                    <h2 className="activities-date">
                      Duración estimada: {durationString || "Duración"}
                    </h2>
                    <p className="activities-access">
                      {activity.extendedProperties?.private?.access ? (
                        <>
                          {console.log(
                            "Access:",
                            activity.extendedProperties.private.access
                          )}{" "}
                          {/* Agrega esto para depurar */}
                          {activity.extendedProperties.private.access.trim() ===
                          "socios"
                            ? "Exclusivo para socios"
                            : "Abierto a la comunidad"}
                        </>
                      ) : (
                        "Acceso no especificado"
                      )}
                    </p>

                    <button
                      className="activities-inscription"
                      onClick={() => handleEnrollClick(activity, index + 1)}
                    >
                      {activity.summary.includes("EVENTO CANCELADO")
                        ? "Inscripciones cerradas"
                        : "Inscribirse"}
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
