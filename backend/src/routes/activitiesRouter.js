import express from 'express'
import {
    joinPartnerActivity,
    joinFreeActivity,
    createActivity,
    listEventsController,
} from '../controllers/index.js'
const router = express.Router()

//Ruta para actividades:
router.post('/create-activity', createActivity)
router.post('/list-activities', listEventsController)
router.post('/join-partner-activity', joinPartnerActivity)
router.post('/join-non-partner-activity', joinFreeActivity)

export default router
