import express from 'express'
import {
    joinPartnerActivity,
    joinFreeActivity,
    createActivity,
    getFilteredActivities,
    createFormController,
    saveFormResponses,
} from '../controllers/index.js'
const router = express.Router()

//Ruta para actividades:
router.post('/create-activity', createActivity)
router.post('/get-filtered-activities', getFilteredActivities)
router.post('/create-form', createFormController)
router.post('/submit-form/:sheetName', saveFormResponses)
router.post('/join-partner-activity', joinPartnerActivity)
router.post('/join-non-partner-activity', joinFreeActivity)

export default router
