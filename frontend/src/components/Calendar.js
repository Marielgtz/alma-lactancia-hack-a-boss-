import React, { useEffect, useState } from "react";
import { listCalendarEventsService } from "../services/api";
import "./Calendar.css";

const Calendar = () => {
  const [events, setEvents] = useState([]); // Estado para eventos
  const [loading, setLoading] = useState(true); // Estado para la carga
  const [error, setError] = useState(null); // Estado para errores

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await listCalendarEventsService();
        setEvents(eventsData);
      } catch (error) {
        setError("Error fetching events");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Finaliza la carga
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
              {event.summary} -{" "}
              {new Date(event.start.dateTime).toLocaleString()}
            </div>
          ))
        ) : (
          <div className="activity">No hay actividades programadas</div>
        )}
      </div>
      <h2 className="section-title-calendar">Calendario</h2>
      <div className="calendar-content">
        <div className="calendar-container">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=adm.almalactancia%40gmail.com&ctz=UTC"
            title="Google Calendar"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
