import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CustomToolbar from "./CustomToolbar";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

moment.updateLocale("es", {
  week: {
    dow: 1, // Establece que el primer día de la semana es lunes (0 = domingo, 1 = lunes)
    doy: 4, // El primer día del año debe ser un lunes
  },
});

const localizer = momentLocalizer(moment);

const messages = {
  month: "Mes",
  week: "Semana",
  day: "Día",
  today: "Hoy",
  previous: "Anterior",
  next: "Siguiente",
  sunday: "dom",
  monday: "lu",
  tuesday: "ma",
  wednesday: "mié",
  thursday: "jue",
  friday: "vie",
  saturday: "sáb",
  showMore: (total) => `+ Ver más (${total})`,
};

const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
          title: event.summary, // Usar summary como título
          start: new Date(event.start.dateTime || event.start.date), // Mostrar fecha de inicio
          end: new Date(event.end.dateTime || event.end.date), // Mostrar fecha de finalización
          id: event.id, // Incluir el id si se necesita para las claves
          description: event.description || "", // Incluir la descripción si está disponible
        }));

        // Ordenar los eventos por fecha de inicio y tomar los 3 más cercanos
        const sortedEvents = formattedEvents
          .sort((a, b) => new Date(a.start) - new Date(b.start))
          .slice(0, 3);

        setEvents(sortedEvents);
      } catch (error) {
        setError("Error fetching events");
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Función para formatear la fecha
  const formatEventDate = (date) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    };
    let formattedDate = new Date(date).toLocaleDateString("es-ES", options);
    formattedDate = formattedDate.replace(",", "").replace(",", " |");
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  };

  // Función para monstrar la descripción del evento en el calendario
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleSelectSlot = (slotInfo) => {
    const event = events.find(
      (event) =>
        new Date(event.start).toLocaleDateString() ===
        new Date(slotInfo.start).toLocaleDateString()
    );
    setSelectedEvent(event || null);
  };

  const handleDayClick = (slotInfo) => {
    const event = events.find(
      (event) =>
        new Date(event.start).toLocaleDateString() ===
        new Date(slotInfo).toLocaleDateString()
    );
    setSelectedEvent(event || null);
  };

  return (
    <div className="calendar-section">
      <h2 className="section-title-activity">Próximas actividades</h2>
      <div className="activities">
        {loading ? (
          <p>Cargando actividades...</p>
        ) : error ? (
          <p>{error}</p>
        ) : events.length > 0 ? (
          events.map((event) => (
            <div className="activity" key={event.id}>
              <p className="event-title">{event.title}</p>
              <p className="event-description">{event.description}</p>
              <p className="event-date">{formatEventDate(event.start)}</p>
            </div>
          ))
        ) : (
          <div className="activity">No hay actividades programadas</div>
        )}
      </div>
      <h2 className="section-title-calendar">Calendario</h2>
      <div className="calendar-content">
        <div className="calendar-container">
          <div className="event-details">
            {selectedEvent ? (
              <div>
                <h3 className="event-title">{selectedEvent.title}</h3>
                <p className="event-date">
                  {new Date(selectedEvent.start)
                    .toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .replace(",", "")
                    .replace(",", " |")}
                </p>
                <p className="event-description">{selectedEvent.description}</p>
              </div>
            ) : (
              <p className="no-events">
                No hay eventos programados para este día.
              </p>
            )}
          </div>
          <div className="calendar-wrapper">
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
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                onDrillDown={handleDayClick}
                components={{
                  toolbar: CustomToolbar,
                }}
                messages={messages}
                className="calendar"
                views={{ month: true }}
                popup={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
