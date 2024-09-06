import "./ActivityFilter.css";
import { useState, useEffect } from 'react'
import { SelectInput } from "./SelectInput";
import DateFilter from "./DateFilter";
import parseReceivedDate from "../../services/parseRecievedDate";

function ActivityFilter({ activities, setFilteredActivites }) {

  // Variables de React de los filtros (en useState)
  const [typeEvent, setTypeEvent] = useState("");
  const [locationEvent, setLocationEvent] = useState("");
  const [eventDateStart, setEventDateStart] = useState("");
  const [eventDateEnd, setEventDateEnd] = useState("");

  // const categoryEvents = []; //TODO Cancelada por desarrollo
  // ? Como obtener las categorías disponibles?

  // const locations = []; //TODO Cancelada por desarrollo
  // ? Como obtener las localidades disponibles?

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
    
    if (typeEvent) {
      updatedActivities =  updatedActivities.filter(activity => activity.access === typeEvent) 
    } 

    if (locationEvent) {
      updatedActivities = updatedActivities.filter(activity => {
        // console.log(activity);
        if (activity.location){
          return activity.location.toLowerCase().search(locationEvent) !== -1
        }
      })
    }

    // TODO Implementar comparación de fechas
    // "2024-08-09T10:00:00.000Z"
    // "Jueves, 30 de Noviembre de 2024, 12:00"
    
    console.log(updatedActivities);

    

    setFilteredActivites(updatedActivities);

  }, [typeEvent, locationEvent, activities, setFilteredActivites]);

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
