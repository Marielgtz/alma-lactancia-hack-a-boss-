import React, { useState } from 'react';
import { createEvent } from '../../services/calendar';

export default function EventForm() {
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    startDateTime: "",
    startTimeZone: "Europe/Madrid",
    endDateTime: "",
    endTimeZone: "Europe/Madrid",
    location: "",
    attendees: [{ email: "" }],
    useDefaultReminders: false,
    emailReminder: 1440,
    popupReminder: 10,
    visibility: "private",
    access: "partners",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAttendeeChange = (index, e) => {
    const newAttendees = formData.attendees.map((attendee, i) => {
      if (i === index) {
        return { email: e.target.value };
      }
      return attendee;
    });
    setFormData((prevData) => ({
      ...prevData,
      attendees: newAttendees,
    }));
  };

  const addAttendee = () => {
    setFormData((prevData) => ({
      ...prevData,
      attendees: [...prevData.attendees, { email: "" }]
    }));
  };

  const removeAttendee = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      attendees: prevData.attendees.filter((_, i) => i !== index),
    }));
  };

  const submitNewEvent = (e) => {
    e.preventDefault(); 

    const requestBody = {
      summary: formData.summary,
      description: formData.description,
      start: {
        dateTime: `${formData.startDateTime}:00+02:00`,
        timeZone: formData.startTimeZone
      },
      end: {
        dateTime: `${formData.endDateTime}:00+02:00`,
        timeZone: formData.endTimeZone
      },
      location: formData.location,
    //   ...(formData.attendees.length > 0 && { attendees: formData.attendees }),
      reminders: {
        useDefault: formData.useDefaultReminders,
        overrides: [
          { method: "email", minutes: formData.emailReminder },
          { method: "popup", minutes: formData.popupReminder }
        ]
      },
      visibility: formData.visibility,
      access: formData.access
    };

    // console.log("Event data:", requestBody);
    createEvent(requestBody);
    };

  return (
    <details><summary>Create Event</summary>
    <form onSubmit={submitNewEvent}>
      <h2>Crear Evento</h2>

      <label>Título del evento:</label>
      <input
        type="text"
        name="summary"
        value={formData.summary}
        onChange={handleChange}
        required
      />

      <label>Descripción:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <label>Fecha y hora de inicio:</label>
      <input
        type="datetime-local"
        name="startDateTime"
        value={formData.startDateTime}
        onChange={handleChange}
        required
      />

      <label>Zona horaria de inicio:</label>
      <input
        type="text"
        name="startTimeZone"
        value={formData.startTimeZone}
        onChange={handleChange}
      />

      <label>Fecha y hora de finalización:</label>
      <input
        type="datetime-local"
        name="endDateTime"
        value={formData.endDateTime}
        onChange={handleChange}
        required
      />

      <label>Zona horaria de finalización:</label>
      <input
        type="text"
        name="endTimeZone"
        value={formData.endTimeZone}
        onChange={handleChange}
      />

      <label>Localización:</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />

      <label>Asistentes:</label>
      {formData.attendees.map((attendee, index) => (
        <div key={index}>
          <input
            type="email"
            value={attendee.email}
            onChange={(e) => handleAttendeeChange(index, e)}
            placeholder={`Email del asistente ${index + 1}`}
          />
          {index > 0 && (
            <button type="button" onClick={() => removeAttendee(index)}>
              Eliminar
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addAttendee}>
        Añadir asistente
      </button>

      <label>
        <input
          type="checkbox"
          name="useDefaultReminders"
          checked={formData.useDefaultReminders}
          onChange={handleChange}
        />
        Usar recordatorios por defecto
      </label>

      {!formData.useDefaultReminders && (
        <>
          <label>Recordatorio por email (minutos antes):</label>
          <input
            type="number"
            name="emailReminder"
            value={formData.emailReminder}
            onChange={handleChange}
          />

          <label>Recordatorio popup (minutos antes):</label>
          <input
            type="number"
            name="popupReminder"
            value={formData.popupReminder}
            onChange={handleChange}
          />
        </>
      )}

      <label>Visibilidad:</label>
      <select
        name="visibility"
        value={formData.visibility}
        onChange={handleChange}
      >
        <option value="default">Default</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>

      <label>Acceso:</label>
      <select
        name="access"
        value={formData.access}
        onChange={handleChange}
      >
        <option value="partners">Partners (Socios)</option>
        <option value="free">Free</option>
      </select>

      <button type="submit">Crear evento de prueba</button>
    </form>
    </details>
  );
}
