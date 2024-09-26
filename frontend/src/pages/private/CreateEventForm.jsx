import React, { useEffect, useState } from 'react';
import { createEvent } from '../../services/calendar';
import { cancelCalendarEventService, deleteCalendarEventService, updateCalendarEventService } from '../../services/api';
import formatDate from '../../utils/formatDate';

export default function EventForm({ toEdit, onSuccess }) {
  const defaultActivity = {
    summary: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    location: '',
    access: '',
    parsedStart: '', 
    parsedEnd: '', 
  };

  const [activity, setActivity] = useState(toEdit || defaultActivity);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    console.log(formError);
  },[formError])

  useEffect(() => {
    if (toEdit?.id) {      
      const adaptedData = {
        ...toEdit,
        access: toEdit.extendedProperties?.private?.access || '',
        parsedStart: formatDate(toEdit.start.dateTime, 'local'),
        parsedEnd: formatDate(toEdit.end.dateTime, 'local'),
      };
      setActivity(adaptedData);
    } else {
      setActivity(defaultActivity);
    }

    console.log(toEdit);
    
  }, [toEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setActivity((prevData) => {
      if (name === 'parsedStart') {
        return {
          ...prevData,
          parsedStart: value,
          startDateTime: new Date(value).toISOString(),
        };
      }
      if (name === 'parsedEnd') {
        return {
          ...prevData,
          parsedEnd: value,
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
    const responseMsg = await deleteCalendarEventService(activity.id);
    if (responseMsg.error) {
      console.error('NO SE HA ELIMINADO:', responseMsg.error);
    } else {
      console.log('ÉXITO');
      onSuccess();
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    console.log(activity.id);
    
    const responseMsg = await cancelCalendarEventService(activity.id) //! Same as update for now
    console.log(responseMsg);

    if (responseMsg.message === 'Evento cancelado'){
      console.log('ÉXITO');
      onSuccess();
      
    }
    
  }

  const validateForm = () => {
    // console.log('VALIDATION:',activity.access);
    if (activity.access !== 'partners' && activity.access !== 'free') {
      setFormError('Por favor, seleccione un nivel de acceso válido.');
      return false;
    }

    if (!activity.summary || !activity.parsedStart || !activity.parsedEnd) {
      setFormError('Por favor, complete todos los campos obligatorios.');
      return false;
    }

    setFormError('');
    return true;
  };

  const submitNewEvent = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    console.log(isValid);
    
    
    if (!validateForm()) return;

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
      extendedProperties: {
        private: {
          access: activity.access,
        },
      }
    };

    if (toEdit?.id) {
      const response = await updateCalendarEventService(toEdit.id, requestBody);
      if (response.error) {
        console.error('NO SE HA ACTUALIZADO:', response.error);
      } else {
        console.log('ÉXITO');
        onSuccess();
      }
    } else {
      const response = await createEvent(requestBody);
      if (response.message === 'Actividad creada y subida al calendario correctamente') {
        console.log('ÉXITO');
        onSuccess();
      } else {
        console.log('NO SE HA CREADO:', response.error);
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
        required
      />

      <div className="dateTime-settings">
        <label>Inicio:</label>
        <input
          type="datetime-local"
          name="parsedStart"
          value={activity?.parsedStart || ''}
          onChange={handleChange}
          required
        />

        <label>Finalización:</label>
        <input
          type="datetime-local"
          name="parsedEnd"
          value={activity?.parsedEnd || ''}
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
        required
      />

      <label>Acceso:</label>
      <select
        name="access"
        value={activity?.access || ''}
        onChange={handleChange}
        required
      >
        <option value="default">Seleccionar</option>
        <option value="partners">Solo socios</option>
        <option value="free">Público</option>
      </select>

      {formError && <p style={{ color: 'red' }}>{formError}</p>}

      <br />
      <br />

      <button type="submit" className="confirm-btn">Guardar Cambios</button>
      <button onClick={handleCancel} className="cancel-btn" style={{color:'red'}}>Cancelar actividad</button>
      <button onClick={handleDelete} className="cancel-btn">Eliminar actividad</button>
    </form>
  );
}
