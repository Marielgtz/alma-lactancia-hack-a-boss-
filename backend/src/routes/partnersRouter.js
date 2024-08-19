import express from 'express'
import {
    deletePartner,
    newPartner,
    updatePartner,
} from '../controllers/index.js'
const router = express.Router()

//Ruta para dar de alta un socio/a:
router.post('/newPartner', newPartner)
router.delete('/delete-partner', deletePartner)
router.patch('/update-partner', updatePartner)

export default router
