import React, { useEffect, useState } from 'react';
import { createEvent } from '../../services/calendar';
import { deleteCalendarEventService, updateCalendarEventService } from '../../services/api';
import formatDate from '../../utils/formatDate';

export default function EventForm({ toEdit, onSuccess }) {
  const defaultActivity = {
    summary: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    access: 'free', // Valor por defecto
    parsedStart: '', 
    parsedEnd: '', 
  };

  const [activity, setActivity] = useState(toEdit || defaultActivity);

  useEffect(() => {
    if (toEdit?.id) {
      // Si editamos un evento existende, autorrellenar las fechas
      const adaptedData = {
        ...toEdit,
        parsedStart: formatDate(toEdit.start.dateTime, 'local'),
        parsedEnd: formatDate(toEdit.end.dateTime, 'local'),
      };
      setActivity(adaptedData);
    } else {
      setActivity(defaultActivity);
    }
  }, [toEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setActivity((prevData) => {
      if (name === 'parsedStart') {
        return {
          ...prevData,
          parsedStart: value, // Actualizar campo visual
          startDateTime: new Date(value).toISOString(), 
        };
      }
      if (name === 'parsedEnd') {
        return {
          ...prevData,
          parsedEnd: value, // Actualizar campo visual
          endDateTime: new Date(value).toISOString(),
        };
      }

      return {
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log('Deleting...', activity.id);

    const responseMsg = await deleteCalendarEventService(activity.id);
    if (responseMsg.error) {
      console.error('NO SE HA ELIMINADO:', responseMsg.error);
    } else {
      console.log('ÉXITO');
      onSuccess();
    }
  };

  const submitNewEvent = async (e) => {
    e.preventDefault();
    // console.log(activity.access); //? Da siempre undefined?

    const requestBody = {
      summary: activity.summary,
      description: activity.description,
      start: {
        dateTime: activity.start?.dateTime || activity.startDateTime,
        timeZone: 'Europe/Madrid',
      },
      end: {
        dateTime: activity.end?.dateTime || activity.endDateTime,
        timeZone: 'Europe/Madrid',
      },
      location: activity.location,
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 1440 },
          { method: 'popup', minutes: 60 },
        ],
      },
      visibility: 'private',
      access: activity.access,
    };

    // console.log('Event data submitted:', requestBody);

    if (toEdit?.id) {
      const response = await updateCalendarEventService(toEdit.id, requestBody);
      if (response.error) {
        console.error('NO SE HA ACTUALIZADO:', response.error);
      } else {
        console.log('ÉXITO');
        onSuccess();
      }
    } else if (!toEdit?.id) {
      const response = await createEvent(requestBody);
      if (response.message === 'Actividad creada y subida al calendario correctamente') {
        console.log('ÉXITO');
        onSuccess();
      } else {
        console.log('Se ha producido un error en la petición de creación...');
      }
    }
  };

  return (
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

      <div className="dateTime-settings">
        <label>Inicio:</label>
        <input
          type="datetime-local"
          name="parsedStart"
          value={activity?.parsedStart}
          onChange={handleChange}
          required
        />

        <label>Finalización:</label>
        <input
          type="datetime-local"
          name="parsedEnd"
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

      <label>Acceso:</label>
      <select name="access" value={activity?.access || ''} onChange={handleChange}>
        <option value="default">Seleccionar</option>
        <option value="partners">Solo socios</option>
        <option value="free">Público</option>
      </select>

      <br />
      <br />

      <button type="submit" className='confirm-btn'>Guardar Cambios</button>
      <button onClick={handleDelete} className='cancel-btn'>Eliminar actividad</button>
    </form>
  );
}
