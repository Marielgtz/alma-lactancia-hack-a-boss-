import express from 'express'
import {
    deleteEventController,
    updateEventController,
    listEventsController,
} from '../controllers/index.js'
const router = express.Router()

//Ruta para actividades del calendario:
router.delete('/delete-calendar-event/:eventId', deleteEventController)
router.patch('/update-calendar-event/:eventId', updateEventController)
router.post('/list-calendar-events', listEventsController)

export default router
