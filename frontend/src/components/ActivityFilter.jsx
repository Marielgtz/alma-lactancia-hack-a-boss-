import "./ActivityFilter.css";

function ActivityFilter() {
  return (
    <div className="filter-container">
            <span className="filter filter-type">
                <label htmlFor="type">Tipo</label>
                <select id="type" className="select-input" type="select" placeholder="Cualquier tipo">
                    <option value="Obradoiro">Obradoiro</option>
                    <option value="Charla">Charla</option>
                </select>
            </span>
            <span className="filter filter-locality">
                <label htmlFor="locality">Localidad</label>
                <select id="locality" className="select-input" type="select" placeholder="Cualquier localidad">
                    <option value="A Coruña">A Coruña</option>
                    <option value="Culleredo">Culleredo</option>
                </select>            </span>
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
