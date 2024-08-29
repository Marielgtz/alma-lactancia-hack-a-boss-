import express from 'express'
import {
    createFormController,
    saveFormResponses,
    getAllForms,
    getFormById,
    getPublishedForm,
    unpublishForm,
    deleteForm,
    checkIsPublished,
} from '../controllers/index.js'
const router = express.Router()

//Ruta para actividades:
router.post('/create-form', createFormController)
router.delete('/delete-form/:formId/:deleteSheet?/:sheetName?', deleteForm)
router.get('/get-all-forms', getAllForms)
router.get('/get-form/:formId/:publish?', getFormById)
router.get('/get-published-form', getPublishedForm)
router.get('/unpublish-form', unpublishForm)
router.get('/check-is-published/:formId', checkIsPublished)
router.post('/submit-form/:sheetName', saveFormResponses)

export default router
