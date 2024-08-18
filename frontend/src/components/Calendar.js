import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/es';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/list-calendar-events",
          {
            method: "POST", // El método tiene que coincidir con la ruta del servidor
          }
        );
        const data = await response.json();
        console.log("Datos recibidos:", data);

        // Verifica si data es un array o un objeto que contiene un array
        const eventsArray = Array.isArray(data.response)
          ? data.response
          : (data && data.events) || [];

        // Mapear los eventos al formato necesario para react-big-calendar
        const formattedEvents = eventsArray.map((event) => ({
          title: event.summary,
          start: new Date(event.start.dateTime || event.start.date),
          end: new Date(event.end.dateTime || event.end.date),
          id: event.id, // Incluir el id si se necesita para las claves
        }));

        setEvents(formattedEvents);
      } catch (error) {
        setError("Error fetching events");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="calendar-section">
      <div className="activities">
        <h2 className="section-title-activity">Próximas actividades</h2>
        {loading ? (
          <p>Cargando actividades...</p>
        ) : error ? (
          <p>{error}</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div className="activity" key={event.id}>
              {event.title} - {new Date(event.start).toLocaleString()}
            </div>
          ))
        ) : (
          <div className="activity">No hay actividades programadas</div>
        )}
      </div>
      <h2 className="section-title-calendar">Calendario</h2>
      <div className="calendar-content">
        <div className="calendar-container">
          {loading ? (
            <p>Cargando calendario...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              messages={{
                month: 'Mes',
                week: 'Semana',
                day: 'Día',
                today: 'Hoy',
                previous: 'Anterior',
                next: 'Siguiente',
                showMore: (total) => `+ Ver más (${total})`,
              }}
              className="calendar"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
