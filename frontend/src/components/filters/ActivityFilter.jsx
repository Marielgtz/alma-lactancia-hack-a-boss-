import "./ActivityFilter.css";
import { useState, useEffect } from 'react'
import { SelectInput } from "./SelectInput";
import DateFilter from "./DateFilter";
// import parseReceivedDate from "../../services/parseRecievedDate";
import { compareISO } from "../../services/api";

function ActivityFilter({ activities, setFilteredActivites }) {

  // Variables de React de los filtros (en useState)
  const [typeEvent, setTypeEvent] = useState("");
  const [locationEvent, setLocationEvent] = useState("");
  const [eventDateStart, setEventDateStart] = useState("");
  const [eventDateEnd, setEventDateEnd] = useState("");

  // const categoryEvents = []; //TODO Cancelada por desarrollo
  // ? Como obtener las categorías disponibles?

  // ! MOCKUPS =========================================================

  const categoryEvents = [

    { label: "Entrada libre", value: "free" },
    { label: "Exclusivo Socios", value: "member" }
  ];

  const locations = [
    { label: "A Coruña", value: "coruña" },
    { label: "Culleredo", value: "culleredo" },
    { label: "Pontevedra", value: "pontevedra" }
  ]

  //! ===================================================================

  //? Control en desarrollo =============================================

  useEffect(() => {
    let msg = 'Filtro actual: '
    if(typeEvent) msg = msg + "" + typeEvent + ","
    if(locationEvent) msg = msg + "" + locationEvent + ","
    if(eventDateStart) msg = msg + "" + eventDateStart + ","
    if(eventDateEnd) msg = msg + "" + eventDateEnd + ","
    console.log(msg);
  
  },[typeEvent, locationEvent, eventDateStart, eventDateEnd])

  // ? ==================================================================

  useEffect(() => {
    let updatedActivities = activities
    // updatedActivities es una variable a la que se le aplican los filtros que se escogan
    // Una vez aplicados los filtros, se devuelve el array de actividades filtrado
    

    // * FILTRADO POR TIPO DE ACCESO

    if (typeEvent) {
      updatedActivities =  updatedActivities.filter(activity => activity.access === typeEvent) 
    } 

    // * FILTRADO POR LOCALIZACIÓN DEL EVENTO
    if (locationEvent) {
      updatedActivities = updatedActivities.filter(activity => {
        // console.log(activity);
        if (activity.location){
          return activity.location.toLowerCase().search(locationEvent) !== -1
        }
      })
    }

    //* LÓGICA DE COMPARACIÓN DE FECHAS
    if (eventDateStart) {
      console.log('Event date start: TRUE');
      
      updatedActivities = updatedActivities.filter(activity => {

        // Adecuar fechas al formato ISO
        const fromDate =`${eventDateStart}T00:00:00`;
        const eventStart = activity.start.dateTime;
        
        return compareISO(fromDate, eventStart) <= 0;
      }
      )
    }
    if (eventDateEnd) {
      console.log('Event date end: TRUE');

      updatedActivities = updatedActivities.filter(activity => {

        // Adecuar fechas al formato ISO
        const limitDate = `${eventDateEnd}T00:00:00`;
        const eventEnd= activity.end.dateTime;
        
        return compareISO(limitDate, eventEnd) > 0;
      }
      )
    }
    
    // console.log(updatedActivities);
    setFilteredActivites(updatedActivities);

  }, [typeEvent, locationEvent, eventDateStart, eventDateEnd, activities, setFilteredActivites]);

  //? ===================================================================

  return (
    <div className="filter-container">
      <SelectInput 
       className={"filter filter-type"}
       setStatus={setTypeEvent}
       text={"Tipo"}
       defaultLabel={"Todos los tipos"}
       eventType={"typeEvent"}
       options={categoryEvents}
       onChange={(e) => setTypeEvent(e.target.value)}
      ></SelectInput>

       <SelectInput 
       className={"filter filter-type"}
       setStatus={setLocationEvent}
       text={"Localidad"}
       defaultLabel={"Todas las localidades"}
       eventType={"locationEvent"}
       options={locations}
       onChange={(e) => setLocationEvent(e.target.value)}
      ></SelectInput>

      <DateFilter
        label="Desde" 
        date={eventDateStart} 
        setDate={setEventDateStart} 
      />

      <DateFilter
         label="Hasta" 
         date={eventDateEnd} 
         setDate={setEventDateEnd} 
       />
      
    </div>
  );
}

export default ActivityFilter;
