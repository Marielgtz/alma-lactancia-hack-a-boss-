import React, { useEffect, useState } from "react";
import { getCalendarEvents } from "../../services/api";
import "./AdminActivities.css";
import EventForm from "../../pages/private/CreateEventForm";
import EditableEvent from "./editableEvent";
import formatDate from "../../utils/formatDate";
import { toast } from "react-toastify";
import "./Modals/editableList.css";

const AdminActivities = () => {
  const [toEdit, setToEdit] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [eventsList, setEventsList] = useState([]);

  // Cambiar entre modo lista o edición
  function toggleEditMode(activityData = {}) {
    setIsEditMode((prevValue) => !prevValue);
    setToEdit(activityData);
  }

  async function getEvents() {
    const loadingToast = toast.loading("Cargando eventos...");
    try {
      const calendarEvents = await getCalendarEvents();
      setEventsList(calendarEvents);
      toast.dismiss();
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.update(loadingToast, {
        render: "Error al cargar los eventos",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }

  useEffect(() => {
    getEvents(); // Fetch al cargar la página
  }, []);

  // Actualizar lista al gestionar eventos
  function deleteEvent(eventId) {
    setEventsList((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  }

  async function refreshEventsList() {
    toggleEditMode({});
    await getEvents(); // Actualiza eventos tras una actualización
  }

  return (
    <main className="settings-content">
      <h1>Actividades</h1>

      {/* Muestra las actividades */}
      <div id="activities-display" className={isEditMode ? "hidden" : ""}>
        <p>Selecciona la actividad que deseas editar:</p>
        <ol>
          {eventsList.map((activity) => (
            <EditableEvent
              key={activity.id}
              onClick={() => toggleEditMode(activity)}
              setToEdit={setToEdit}
              eventData={activity}
              onDelete={() => deleteEvent(activity.id)}
            />
          ))}
        </ol>

        <h1>Creador de actividades</h1>
        <button onClick={() => toggleEditMode()} className="confirm-btn">
          Crear nueva actividad
        </button>
      </div>

      {/* Crea o edita una actividad */}
      <div className={!isEditMode ? "hidden" : ""}>
        <button onClick={() => toggleEditMode({})} className="confirm-btn">
          Volver atrás
        </button>
        <p>Editando: {toEdit?.summary || "Nueva actividad"}</p>
        <p>
          Fecha:{" "}
          {toEdit?.start
            ? formatDate(toEdit.start.dateTime)
            : "Fecha no especificada"}
        </p>

        <EventForm toEdit={toEdit} onSuccess={refreshEventsList} />
      </div>
    </main>
  );
};

export default AdminActivities;
