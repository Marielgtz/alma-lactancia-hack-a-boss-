import React, { useEffect, useState } from 'react';
import { createEvent } from '../../services/calendar';
import { updateCalendarEventService } from '../../services/api';
import formatDate from '../../utils/formatDate';

export default function EventForm({toEdit, onSuccess}) {
  const defaultActivity = {
    summary: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    access: 'free', // Valor por defecto
  };

  const [activity, setActivity] = useState(toEdit || defaultActivity);
  
  useEffect(() => {
    if (toEdit?.id) { // Si existe una actividad previa (modificando)
      // console.log('Datos previos de la actividad cargados');
      const adaptedData = { 
        ...toEdit,
        parsedStart:formatDate(toEdit.start.dateTime, "local"), // Fecha adaptada a input
        parsedEnd:formatDate(toEdit.end.dateTime, "local") // Fecha adaptada a input
      };

      setActivity(adaptedData)
    } else { // Si no existe actividad previa (creación)
      // console.log('Sin datos previos');
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

  const submitNewEvent = async (e) => {
    e.preventDefault(); 
    console.log(activity.access);
    

    // Adecuar los datos del formulario al estándar de Google
    const requestBody = {
      summary: activity.summary,
      description: activity.description,
      start: {
        dateTime: activity.start.dateTime || `${activity.startDateTime }:00+02:00`,
        timeZone: "Europe/Madrid"
      },
      end: {
        dateTime: activity.end.dateTime || `${activity.endDateTime}:00+02:00`,
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

    console.log("Event data submitted:", requestBody);

  
    if (toEdit?.id) { //* Lógica de modificar una actividad
      console.log('Actualizando evento...');

      const response = await updateCalendarEventService(toEdit.id, requestBody)
      if (response.error){
        console.error('NO SE HA ACTUALIZADO:', response.error);
      } 
      else {
        // console.log(response);
        console.log('ÉXITO');
        onSuccess();
      }
     
    } else if (!toEdit?.id) { //* Lógica de crear una nueva actividad
      console.log("Creando evento...");

      const response = await createEvent(requestBody);
      console.log(response);
      if (response.message === "Actividad creada y subida al calendario correctamente") { 
        console.log('ÉXITO');
        onSuccess();
      }
      else {
        console.log("Se ha producido un error en la petición de creación...")
      }
    }
    };

  

  return ( //! Quitar los <BR/> al acabar desarrollo
    <form onSubmit={submitNewEvent}>
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
        value={activity?.parsedStart}
        onChange={handleChange}
        required
      />

      <label>Finalización:</label>
      <input
        type="datetime-local"
        name="endDateTime"
        value={activity?.parsedEnd}
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
        <option value="default">Seleccionar</option>
        <option value="partners">Solo socios</option>
        <option value="free">Público</option>
      </select>

      <br />
      <br />
      
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}
