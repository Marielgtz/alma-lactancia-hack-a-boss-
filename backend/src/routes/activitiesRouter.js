import express from 'express'
const router = express.Router()
import {
    getSheetController,
    deleteRowController,
    searchRowController,
    updateDataController,
    createDataController,
} from '../controllers/index.js'

//Ruta para manejar datos de actividades:
router.post('/activities/create', createDataController)
router.patch('/activities/update', updateDataController)
router.delete('/activities/:field/:value', deleteRowController)
router.get('/activities/:sheetName', getSheetController)
router.get('/activities/search/:field/:value', searchRowController)

export default router
