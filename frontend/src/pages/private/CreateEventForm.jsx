import React, { useEffect, useState } from "react";
import { createEvent } from "../../services/calendar";
import {
  cancelCalendarEventService,
  deleteCalendarEventService,
  updateCalendarEventService,
} from "../../services/api";
import formatDate from "../../utils/formatDate";
import { toast } from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal.jsx";

import "../../components/forms/dashboardFormStyles.css";

export default function EventForm({ toEdit, onSuccess }) {
  const defaultActivity = {
    summary: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    location: "",
    access: "",
    parsedStart: "",
    parsedEnd: "",
  };

  const [activity, setActivity] = useState(toEdit || defaultActivity);
  const [formError, setFormError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para el modal de eliminación

  useEffect(() => {
    if (toEdit?.id) {
      const adaptedData = {
        ...toEdit,
        access: toEdit.extendedProperties?.private?.access || "",
        parsedStart: formatDate(toEdit.start.dateTime, "local"),
        parsedEnd: formatDate(toEdit.end.dateTime, "local"),
      };
      setActivity(adaptedData);
    } else {
      setActivity(defaultActivity);
    }
  }, [toEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setActivity((prevData) => {
      if (name === "parsedStart") {
        return {
          ...prevData,
          parsedStart: value,
          startDateTime: new Date(value).toISOString(),
        };
      }
      if (name === "parsedEnd") {
        return {
          ...prevData,
          parsedEnd: value,
          endDateTime: new Date(value).toISOString(),
        };
      }

      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  // Función para manejar la eliminación
  const handleDelete = (e) => {
    e.preventDefault();
    setShowDeleteModal(true); // Muestra el modal de confirmación
  };

  const confirmDelete = async () => {
    setShowDeleteModal(false); // Cierra el modal
    const processToast = toast.loading("Eliminando evento...");
    try {
      const responseMsg = await deleteCalendarEventService(activity.id);
      if (responseMsg.error) {
        throw new Error(responseMsg.error);
      }
      toast.dismiss(processToast);
      toast.success("Evento eliminado con éxito");
      onSuccess();
    } catch (error) {
      toast.dismiss(processToast);
      toast.error(`Error al eliminar evento: ${error.message}`);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false); // Cierra el modal si el usuario cancela
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    const processToast = toast.loading("Cancelando evento...");
    try {
      const responseMsg = await cancelCalendarEventService(activity.id);
      if (responseMsg.message === "Evento cancelado") {
        toast.dismiss(processToast);
        toast.success("Evento cancelado con éxito");
        onSuccess();
      } else {
        throw new Error(responseMsg.error || "Error al cancelar el evento");
      }
    } catch (error) {
      toast.dismiss(processToast);
      toast.error(`Error al cancelar evento: ${error.message}`);
    }
  };

  const validateForm = () => {
    if (activity.access !== "partners" && activity.access !== "free") {
      setFormError("Por favor, seleccione un nivel de acceso válido.");
      return false;
    }

    if (!activity.summary || !activity.parsedStart || !activity.parsedEnd) {
      setFormError("Por favor, complete todos los campos obligatorios.");
      return false;
    }

    setFormError("");
    return true;
  };

  const submitNewEvent = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const processToast = toast.loading("Guardando cambios...");

    const requestBody = {
      summary: activity.summary,
      description: activity.description,
      start: {
        dateTime: activity.start?.dateTime || activity.startDateTime,
        timeZone: "Europe/Madrid",
      },
      end: {
        dateTime: activity.end?.dateTime || activity.endDateTime,
        timeZone: "Europe/Madrid",
      },
      location: activity.location,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 },
          { method: "popup", minutes: 60 },
        ],
      },
      visibility: "private",
      access: activity.access,
      extendedProperties: {
        private: {
          access: activity.access,
        },
      },
    };

    try {
      if (toEdit?.id) {
        const response = await updateCalendarEventService(
          toEdit.id,
          requestBody
        );
        if (response.error) {
          throw new Error(response.error);
        }
        toast.dismiss(processToast);
        toast.success("Evento actualizado con éxito");
        onSuccess();
      } else {
        const response = await createEvent(requestBody);
        if (
          response.message ===
          "Actividad creada y subida al calendario correctamente"
        ) {
          toast.dismiss(processToast);
          toast.success("Nuevo evento creado con éxito");
          onSuccess();
        } else {
          throw new Error(response.error);
        }
      }
    } catch (error) {
      toast.dismiss(processToast);
      toast.error(`Error al guardar evento: ${error.message}`);
    }
  };

  return (
    <form onSubmit={submitNewEvent} className="dashboard-form">
      <label>Título del evento:</label>
      <input
        type="text"
        name="summary"
        value={activity?.summary || ""}
        onChange={handleChange}
        required
      />

      <label>Descripción:</label>
      <textarea
        name="description"
        value={activity?.description || ""}
        onChange={handleChange}
        required
      />

      <label>Localización:</label>
      <input
        type="text"
        name="location"
        value={activity?.location || ""}
        onChange={handleChange}
        required
      />

      <div className="datetime-selector">
        <label id="label-start">Inicio:</label>
        <input
          id="input-start"
          className="datetime-input"
          type="datetime-local"
          name="parsedStart"
          value={activity?.parsedStart || ""}
          onChange={handleChange}
          required
        />

        <label id="label-end">Finalización:</label>
        <input
          id="input-end"
          className="datetime-input"
          type="datetime-local"
          name="parsedEnd"
          value={activity?.parsedEnd || ""}
          onChange={handleChange}
          required
        />
      </div>

      <label>Acceso:</label>
      <select
        name="access"
        value={activity?.access || ""}
        onChange={handleChange}
        required
      >
        <option value="default">Seleccionar</option>
        <option value="partners">Solo socios</option>
        <option value="free">Público</option>
      </select>

      {formError && <p style={{ color: "red" }}>{formError}</p>}
      <br />

      <button type="submit" className="confirm-btn">
        <i className="fas fa-save"></i> Guardar Cambios
      </button>
      <button
        onClick={handleDelete}
        className="boton-eliminar-actividad-dashboard"
      >
        <i className="fas fa-trash-alt"></i> Eliminar actividad
      </button>
      <button onClick={handleCancel} className="boton-cancelar-dashboard">
        <i className="fas fa-times"></i> Cancelar actividad
      </button>

      {/* Agrega el modal de confirmación */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        message={`¿Estás seguro de que deseas eliminar la actividad "${activity.summary}"? Esta acción no se puede deshacer.`}
      />
    </form>
  );
}
