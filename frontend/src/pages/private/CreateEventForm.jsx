import React, { useEffect, useState } from 'react';
import { createEvent } from '../../services/calendar';
import { updateCalendarEventService } from '../../services/api';

export default function EventForm({prevData, onCreate, onModify}) {  
  const defaultFormData = {
    summary: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    access: 'free', // Valor por defecto
  };

  const [formAction, setFormAction] = useState('create')
  const [formData, setFormData] = useState(defaultFormData);

  // Función que adapta la fecha al input del formulario
  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
  };
  
  useEffect(() => {
    if (prevData.id) {
      setFormAction('update')
      setFormData({
        summary: prevData.summary || '',
        description: prevData.description || '',
        startDateTime: formatDateTimeForInput(prevData.start?.dateTime), // Formateado para mostrar en input
        endDateTime: formatDateTimeForInput(prevData.end?.dateTime), // Formateado para mostrar en input
        location: prevData.location || '',
        access: prevData.access
      });
    } else if (!prevData.id) {
      setFormData(defaultFormData)
    }
  }, [prevData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleReset = (e) => {
    e.preventDefault();
    console.log('Cancelando modificaciones...');
    
    // Vaciar el form (reiniciar a estado por defecto)
    setFormData(defaultFormData);

    // Reiniciar form a modo "crear evento"
    setFormAction('create');
  };

  const submitNewEvent = async (e) => {
    e.preventDefault(); 
    console.log(formData);
    
    // Adecuar los datos del formulario al estándar de Google
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

    // TODO - Mejorar gestión de errores
    if (formAction === "create") {
      console.log('Creando...');
      const response = await createEvent(requestBody);
      console.log(response);
      if (response) {
      
        // Vaciar el form (reiniciar a estado por defecto)
        setFormData(defaultFormData);

        // Actualizar lista
        onCreate(requestBody)

      }
     
    // TODO - Mejorar gestión de errores
    } else if (formAction === "update") {
      console.log("Actualizando...");
      const response = await updateCalendarEventService(prevData.id, requestBody)
      console.log(response);         
      
      // Vaciar el form (reiniciar a estado por defecto)
      setFormData(defaultFormData);
      setFormAction('Create')

      // Actualizar lista (con respuesta del back)
      onModify(response.response)
    }
    };

  return (
    <form onSubmit={submitNewEvent}>
      {formAction === "create" && <h2>Crear Evento</h2>}
      {formAction === "update" && <h2>Modificar Evento</h2>}

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

      <div className='dateTime-settings'>
      <label>Inicio:</label>
      <input
        type="datetime-local"
        name="startDateTime"
        value={formData.startDateTime}
        onChange={handleChange}
        required
      />

      <label>Finalización:</label>
      <input
        type="datetime-local"
        name="endDateTime"
        value={formData.endDateTime}
        onChange={handleChange}
        required
      />
      </div>

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
        formAction === "update" 
        ?(
          <>
          <button type="submit">Modificar evento</button>
          <button onClick={handleReset}>Cancelar modificaciones</button>
          </>
        )
        :(<button type="submit">Crear evento</button>)
      }
    </form>
  );
}
