import "./ActivityFilter.css";
import { useState, useEffect } from 'react'
import { SelectInput } from "./SelectInput";
import { getPastEvents } from "../../services/api";

function ActivityFilter() {

  // Variables de React de los filtros (en useState)
  const [typeEvent, setTypeEvent] = useState("");
  const [locationEvent, setLocationEvent] = useState("");
  const [eventDateStart, setEventDateStart] = useState();
  const [eventDateEnd, setEventDateEnd] = useState();

  // const categoryEvents = []; //TODO Cancelada por desarrollo
  // ? Que por cada categoría diferente del fetch saque una categoría?

  // const locations = []; //TODO Cancelada por desarrollo
  // ? Que por cada localidad diferente del fetch saque una localidad?  

  // ! MOCKUPS =========================================================

  const categoryEvents = [
    "Obradoiro",
    "Charla"
  ]

  const locations = [
    "A Coruña",
    "Culleredo"
  ]

  //! ===================================================================

  return (
    <div className="filter-container">
      <SelectInput 
       className={"filter filter-type"}
       setStatus={setTypeEvent}
       text={"Tipo"}
       eventType={"typeEvent"}
       options={categoryEvents}
       onChange={(e) => setTypeEvent(e.target.value)}
      ></SelectInput>

       <SelectInput 
       className={"filter filter-type"}
       setStatus={setLocationEvent}
       text={"Localidad"}
       eventType={"locationEvent"}
       options={locations}
       onChange={(e) => setLocationEvent(e.target.value)}
      ></SelectInput>

      <span className="filter filter-since">
        <label htmlFor="since">Desde</label>
        <input className="input-date" id="since" type="date" placeholder="Cualquier momento" />
      </span>

      <span className="filter filter-until">
        <label htmlFor="until">Hasta</label>
        <input className="input-date" id="until" type="date" placeholder="Cualquier momento" />
      </span>
    </div>
  );
}

export default ActivityFilter;
