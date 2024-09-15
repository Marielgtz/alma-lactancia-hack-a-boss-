import React, { useEffect, useState } from 'react';
import { getCalendarEvents } from '../../services/api';
import './AdminActivities.css'
import EventForm from '../../pages/private/CreateEventForm';
import EditableEvent from './editableEvent';

const AdminActivities = () => {
  // Sacar los eventos
  const [isHidden, setIsHidden] = useState(true);
  const [isFormHidden, setIsFormHidden] = useState(true);
  const [eventsList, setEventsList] = useState([]);
  const [formEvent, setFormEvent] = useState({});

  const toggleHidden = () => {
    setIsHidden(prevState => !prevState);
  };

  // TODO - Que el formulario aparezca y desaparezca?
  const toggleFormHidden = () => {
    setIsFormHidden(prevState => !prevState); 
  };

  useEffect(() => {
    async function getEvents() {
      const calendarEvents = await getCalendarEvents();
      console.log(calendarEvents);
      setEventsList(calendarEvents)
    }

    getEvents();
  },[])

  useEffect(() => {
    console.log("New data form:", formEvent);
    
  }, [formEvent])


  // Funciones para actualizar la lista al gestionar eventos

  function deleteEvent(eventId) {
    setEventsList(prevEvents => prevEvents.filter(event => event.id !== eventId));
  }

  function modifyEvent(updatedEvent) {
    setEventsList(prevEvents =>
      prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
    );
  }

  function createEvent() {
    setEventsList(prevEvents => [...prevEvents, newEvent]);
  }


  return (
    <main className='settings-content'>
    <div>
      <h1>Gestor de actividades</h1>
      <button onClick={toggleHidden}>Modificar Actividades</button>

        <ol className={isHidden ? 'hidden' : ''}>
        {eventsList.map((event)=>{
          return(
            <EditableEvent 
            key={event.id} 
            eventData={event}
            etFormEvent={setFormEvent} 
            setFormEvent={setFormEvent}
            onDelete={() => deleteEvent(event.id)}/>
          )
        })}
        </ol>


        <EventForm prevData={formEvent} onCreate={createEvent} onModify={modifyEvent}/>
    </div>
    </main>
  );
};

export default AdminActivities;