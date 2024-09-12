import React from 'react'
import { deleteCalendarEventService, getCalendarEvents } from '../../services/api'

function EditableEvent({eventData}) {
    async function handleDelete(){
    console.log("Eliminando evento...", {
      título: eventData.summary,
      lugar: eventData.location,
      fecha: eventData.start.dateTime
    });
    
       const response = await deleteCalendarEventService(eventData.id);
       console.log(response);
       location.reload();
    }

    async function handleUpdate() {
        
    }

  return (
    <>
    <li key={eventData.id} className='admin-list'>
    <h2>{eventData.summary}</h2>
    <p>{eventData.location}</p>
    <p>{eventData.start.dateTime}</p>
    <button onClick={handleDelete}>Borrar</button>
    <button onClick={handleUpdate}>Modificar</button>
  </li>
    </>
  )
}

export default EditableEvent
