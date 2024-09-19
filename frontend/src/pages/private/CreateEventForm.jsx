import React, { useEffect, useState } from 'react';
import { createEvent } from '../../services/calendar';
import { updateCalendarEventService } from '../../services/api';

export default function EventForm({toEdit, onCreate, onModify}) {
  // const [prevActivity, setPrevActivity] = useState(toEdit);  
  const defaultActivity = {
    summary: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    access: 'free', // Valor por defecto
  };

  const [formAction, setFormAction] = useState('create')
  const [activity, setActivity] = useState(toEdit);

  // Función que adapta la fecha al input del formulario
  // const formatDateTimeForInput = (dateString) => {
  //   if (!dateString) return '';
  //   const date = new Date(dateString);
  //   return date.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:MM'
  // };
  
  useEffect(() => {
    if (toEdit?.id) {
      console.log('Datos previos de la actividad cargados');
      setActivity(toEdit)
      //TODO - ¿Cómo adaptar la fecha para que se coloque en el form?
    } else {
      console.log('Sin datos previos');
      setActivity(toEdit);
    }
  }, [toEdit])

  const handleChange = (e) => {
    // Actualizar dinámicamente el objeto "activity"
    const { name, value, type, checked } = e.target;
    setActivity((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const handleReset = (e) => {
    e.preventDefault();
    console.log('Cancelando modificaciones...');
    
    // Vaciar el form (reiniciar a estado por defecto)
    setActivity(defaultActivity);

    // Reiniciar form a modo "crear evento"
    setFormAction('create');
  };

  const submitNewEvent = async (e) => {
    e.preventDefault(); 

    // Adecuar los datos del formulario al estándar de Google
    const requestBody = {
      summary: activity.summary,
      description: activity.description,
      start: {
        dateTime: `${activity.startDateTime}:00+02:00`,
        timeZone: "Europe/Madrid"
      },
      end: {
        dateTime: `${activity.endDateTime}:00+02:00`,
        timeZone: "Europe/Madrid"
      },
      location: activity.location,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 },
          { method: "popup", minutes: 60 }
        ]
      },
      visibility: "private",
      access: activity.access
    };

    console.log("Event data submitted:", formAction, requestBody);

    if (toEdit?.id) {
      // Lógica de modificar una actividad
      console.log('Actualizando evento...');

      const response = await updateCalendarEventService(toEdit.id, requestBody)
      console.log(response);         
      
      setActivity(defaultActivity); // Vaciar el form

      // Actualizar lista (con respuesta del back) //! Solo debería activarse si fue bien
      // onModify(response.response) //TODO Revisar funcionamiento
     
    } else if (!toEdit?.id) {
      // Lógica de crear una nueva actividad
      console.log("Creando evento...");
      const response = await createEvent(requestBody);
      console.log(response);
      if (response) {
      
        // Vaciar el form (reiniciar a estado por defecto)
        setActivity(defaultActivity); // Vaciar el form

        // Actualizar lista //! Solo debería activarse si fue bien
        //onCreate(requestBody) //TODO Revisar funcionamiento

      }
    }
    };

  return ( //! Quitar los <BR/> al acabar desarrollo
    <form onSubmit={submitNewEvent}>
      {formAction === "create" && <h2>Crear Evento</h2>}
      {formAction === "update" && <h2>Modificar Evento</h2>}

      <label>Título del evento:</label>
      <input
        type="text"
        name="summary"
        value={activity?.summary || ''}
        onChange={handleChange}
        required
      />

      <label>Descripción:</label>
      <textarea
        name="description"
        value={activity?.description || ''}
        onChange={handleChange}
      />

      <div className='dateTime-settings'>
      <label>Inicio:</label>
      <input
        type="datetime-local"
        name="startDateTime"
        value={(activity?.startDateTime)}
        onChange={handleChange}
        required
      />

      <label>Finalización:</label>
      <input
        type="datetime-local"
        name="endDateTime"
        value={activity?.endDateTime}
        onChange={handleChange}
        required
      />
      </div>

      <label>Localización:</label>
      <input
        type="text"
        name="location"
        value={activity?.location || ''}
        onChange={handleChange}
      />

      {/* <label>Visibilidad:</label>
      <select
        name="visibility"
        value={activity.visibility}
        onChange={handleChange}
      >
        <option value="default">Default</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select> */}

      <label>Acceso:</label>
      <select
        name="access"
        value={activity?.access || ''}
        onChange={handleChange}
      >
        <option value="partners">Partners (Socios)</option>
        <option value="free">Free</option>
      </select>

      <br />
      <br />
      
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}
