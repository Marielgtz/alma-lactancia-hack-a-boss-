import React, { useState } from 'react';
import { createEvent } from '../../services/calendar';
import { updateCalendarEventService } from '../../services/api';

export default function EventForm({prevData, eventAction}) {

  // Plantilla del formulario de creación en blanco
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    location: "",
    // visibility: "private",
    access: "partners",
  });

  if (prevData){
    setFormData({
    summary: prevData.summary,
    description: prevData.description,
    startDateTime: prevData.startDateTime,
    endDateTime: prevData.endDateTime,
    location: prevData.location,
    // visibility: prevData.visibility,
    access: prevData.access,
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const submitNewEvent = async (e) => {
    e.preventDefault(); 

    const requestBody = {
      summary: formData.summary,
      description: formData.description,
      start: {
        dateTime: `${formData.startDateTime}:00+02:00`,
        timeZone: "Europe/Madrid"
      },
      end: {
        dateTime: `${formData.endDateTime}:00+02:00`,
        timeZone: "Europe/Madrid"
      },
      location: formData.location,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 },
          { method: "popup", minutes: 60 }
        ]
      },
      visibility: "private",
      access: formData.access
    };

    console.log("Event data submitted:", eventAction, requestBody);

    if (eventAction === "create") {
      createEvent(requestBody);
    } else if (eventAction === "update") {
      console.log("Actualizando...");
      const response = await updateCalendarEventService('1vgu1siv9d8srf1sc97n582mv4', requestBody)
      console.log(response);
      location.reload()
      
    }
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

      <label>Fecha y hora de finalización:</label>
      <input
        type="datetime-local"
        name="endDateTime"
        value={formData.endDateTime}
        onChange={handleChange}
        required
      />

      <label>Localización:</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />

      {/* <label>Visibilidad:</label>
      <select
        name="visibility"
        value={formData.visibility}
        onChange={handleChange}
      >
        <option value="default">Default</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select> */}

      <label>Acceso:</label>
      <select
        name="access"
        value={formData.access}
        onChange={handleChange}
      >
        <option value="partners">Partners (Socios)</option>
        <option value="free">Free</option>
      </select>

      <br />
      <br />
      {
        eventAction === "create" 
        ?( <button type="submit">Crear evento</button>)
        :( <button type="submit">Modificar evento</button>)
      }
    </form>
    </details>
  );
}
