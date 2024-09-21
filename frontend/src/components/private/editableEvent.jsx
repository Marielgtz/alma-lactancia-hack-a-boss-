import React from 'react'
import { deleteCalendarEventService } from '../../services/api'
import formatDate from '../../utils/formatDate';

function EditableEvent({eventData, setFormEvent, onDelete, setToEdit, onClick}) {
    async function handleDelete(){
    console.log("Eliminando evento...", {
      título: eventData.summary,
      lugar: eventData.location,
      fecha: eventData.start.dateTime
    });

        console.log("Deleting...", eventData.id);
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

    eventData.parsedDate = formatDate(eventData.start.dateTime, "short")

  return (
    <>
    <li>
      <button
        onClick={onClick}
      >{`${eventData.summary} | ${eventData.location} | ${eventData.parsedDate}`}</button>
    </li>
    {/* <li key={eventData.id} className='admin-list'>
    <h2>{eventData.summary}</h2>
    <p>{eventData.location}</p>
    <p>{eventData.start.dateTime}</p>
    <button onClick={handleDelete}>Borrar</button>
    <button onClick={handleUpdate}>Modificar</button>
  </li> */}
    </>
  )
}

export default EditableEvent