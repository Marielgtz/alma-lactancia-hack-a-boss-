import "./ActivityFilter.css";

function ActivityFilter() {
  return (
    <div className="filter-container">
            <span className="filter filter-type">
                <label htmlFor="type">Tipo</label>
                <input id="type" type="text" placeholder="Tipo" />
            </span>
            <span className="filter filter-locality">
                <label htmlFor="locality">Localidad</label>
                <input id="locality" type="text" placeholder="Todas las localidades" />
            </span>
            <span className="filter filter-since">
                <label htmlFor="since">Desde</label>
                <input id="since" type="date" placeholder="Cualquier momento" />
            </span>
            <span className="filter filter-until">
                <label htmlFor="until">Hasta</label>
                <input id="until" type="date" placeholder="Cualquier momento" />
            </span>
        </div>
  )
}

export default ActivityFilter
