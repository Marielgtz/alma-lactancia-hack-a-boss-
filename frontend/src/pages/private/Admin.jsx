import React from 'react'
import { createEvent } from '../../services/calendar'

function AdminDashboard() {
  

  return (
    <>
        <menu>Menu Lateral</menu>
        <nav>Navegación opciones
            <button onClick={createEvent}>Crear Evento de ejemplo</button>
        </nav>
    </>
  )
}

export default AdminDashboard
