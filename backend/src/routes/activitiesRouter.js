import express from 'express'
import { joinPartnerActivity, joinFreeActivity } from '../controllers/index.js'
const router = express.Router()

//Ruta para actividades:
router.post('/join-partner-activity', joinPartnerActivity)
router.post('/join-non-partner-activity', joinFreeActivity)

export default router
