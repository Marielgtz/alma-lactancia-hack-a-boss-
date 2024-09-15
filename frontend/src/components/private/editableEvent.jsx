import React from 'react'
import { deleteCalendarEventService } from '../../services/api'

function EditableEvent({eventData, setFormEvent, onDelete}) {
    async function handleDelete(){
    console.log("Eliminando evento...", {
      título: eventData.summary,
      lugar: eventData.location,
      fecha: eventData.start.dateTime
    });

        console.log("Borrando...");
    
        // TODO - Mostrar proceso de borrado (loading)
        
       const response = await deleteCalendarEventService(eventData.id);
       if (response.error){
         console.error(response)
        } else if (response.message.includes('Evento eliminado')){
         console.log(response);
         onDelete(eventData.id)
       };
    };

    async function handleUpdate() {
      setFormEvent(eventData)
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
