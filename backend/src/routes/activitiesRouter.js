import express from 'express'
import {
    joinPartnerActivity,
    joinFreeActivity,
    createActivity,
    getFilteredActivities,
    createFormController,
    saveFormResponses,
    getAllForms,
    getFormById,
} from '../controllers/index.js'
const router = express.Router()

//Ruta para actividades:
router.post('/create-activity', createActivity)
router.post('/get-filtered-activities', getFilteredActivities)
router.post('/create-form', createFormController)
router.get('/get-all-forms', getAllForms)
router.get('/get-form/:formId', getFormById)
router.post('/submit-form/:sheetName', saveFormResponses)
router.post('/join-partner-activity', joinPartnerActivity)
router.post('/join-non-partner-activity', joinFreeActivity)

export default router
