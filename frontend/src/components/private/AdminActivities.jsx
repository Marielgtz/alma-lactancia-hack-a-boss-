import React, { useEffect, useState } from 'react';
import { getCalendarEvents } from '../../services/api';
import './AdminActivities.css'
import EventForm from '../../pages/private/CreateEventForm';
import EditableEvent from './editableEvent';

const AdminActivities = () => {
  // Sacar los eventos
  // const [isHidden, setIsHidden] = useState(true);
  const [toEdit, setToEdit] = useState({})
  const [isEditMode, setIsEditMode] = useState(false);
  const [eventsList, setEventsList] = useState([]);
  const [formEvent, setFormEvent] = useState({});

  function toggleEditMode(activityData) {
    setIsEditMode((prevValue) => !prevValue);
    setToEdit(activityData);     
  }

  // TODO - Que el formulario aparezca y desaparezca?
  const toggleFormHidden = () => {
    setIsFormHidden(prevState => !prevState); 
  };

  useEffect(() => {
    async function getEvents() {
      const calendarEvents = await getCalendarEvents();
      // console.log(calendarEvents);
      setEventsList(calendarEvents)
    }

    getEvents();
  },[])

  // useEffect(() => {
  //   console.log("New data form:", formEvent);
    
  // }, [formEvent])


  // Funciones para actualizar la lista al gestionar eventos
  function deleteEvent(eventId) {
    setEventsList(prevEvents => prevEvents.filter(event => event.id !== eventId));
  }

  function modifyEvent(updatedEvent) {
    setEventsList(prevEvents =>
      prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
    );
  }

  function createEvent(newEvent) {
    setEventsList(prevEvents => [...prevEvents, newEvent]);
  }


  return (
    <main className='settings-content'>
      <h1>Actividades</h1>
      <div id='activities-display' className={isEditMode ? 'hidden' : ''}>
        <p>Selecciona la actividad que deseas editar:</p>
          <ol className=''>
          {eventsList.map((activity)=>{
            return(
              <EditableEvent 
              key={activity.id} 
              onClick={() => toggleEditMode(activity)}

              setToEdit={setToEdit}
              eventData={activity}
              setFormEvent={setFormEvent}
              onDelete={() => deleteEvent(activity.id)}/>
            )
          })}
          </ol>
          <button
            onClick={() => toggleEditMode()}
          >➕ Crear nueva actividad</button>
      </div>
      <div className={!isEditMode ? 'hidden' : ''}>
          <button
            onClick={() => toggleEditMode({})}
          >Volver atrás</button>
        <p>Editando: {toEdit?.summary || 'Nueva actividad'}</p>
        {/* <p>Fecha actual: {toEdit.start.dateTime || 'Fecha no especificada'}</p> */}

          <EventForm 
            toEdit={toEdit} 
            prevData={formEvent} 
            onCreate={createEvent} 
            onModify={modifyEvent}/>
      </div>
    </main>
  );
};

export default AdminActivities;