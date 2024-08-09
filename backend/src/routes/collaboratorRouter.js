import express from 'express'
import multer from 'multer'
import {
    newCollaborator,
    deleteCollaborator,
    updateCollaborator,
} from '../controllers/index.js'
import { storage, limits, fileFilter } from '../utils/index.js'

const router = express.Router()

//Módulo para subir imágenes:
const upload = multer({ storage: storage, limits, fileFilter })

//Ruta para dar de alta un colaborador/a:
router.post(
    '/new-collaborator',
    upload.single('collaboratorImage'),
    newCollaborator
)
router.delete('/delete-collaborator/:id/:team', deleteCollaborator)
router.patch(
    '/update-collaborator/:id/:team',
    upload.single('collaborator-image'),
    updateCollaborator
)

export default router
