import React, { useEffect, useState } from 'react';
import { getCalendarEvents } from '../../services/api';
import './AdminActivities.css'
import EventForm from '../../pages/private/CreateEventForm';
import EditableEvent from './editableEvent';

const AdminActivities = () => {

  // Sacar los eventos
  const [eventsList, setEventsList] = useState([])

  useEffect(() => {
    async function getEvents() {
      const calendarEvents = await getCalendarEvents();
      console.log(calendarEvents);
      setEventsList(calendarEvents)
    }

    getEvents();
  },[])

  return (
    
    <div>
      <h1>Actividades del administrador</h1>
      {/* Contenido de las actividades aquí */}
      <EventForm eventAction={"update"}/>

      <details>
            <summary>Lista de eventos</summary>
          <ol>
          {eventsList.map((event)=>{
            return(
              <EditableEvent key={event.id} eventData={event} />
            )
          })}
          </ol>
          </details>
    </div>
  );
};

export default AdminActivities;