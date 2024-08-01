import express from 'express'
import { activity, freeActivity } from '../controllers/index.js'
const router = express.Router()

//Ruta para actividades:
router.post('/partner-activity', activity)
router.post('/non-partner-activity', freeActivity)

export default router
