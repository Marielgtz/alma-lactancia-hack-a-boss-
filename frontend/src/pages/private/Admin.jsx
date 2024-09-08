import React from 'react'
import { createEvent, modifyEvent } from '../../services/calendar'

function AdminDashboard() {
  return (
    <>
        <menu></menu>
        <nav>
          <button onClick={createEvent}>Crear evento de prueba</button>
          <button onClick={modifyEvent}>Modificar evento de prueba</button>
        </nav>
    </>
  )
}

export default AdminDashboard
