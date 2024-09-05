import express from 'express'
import {
    saveExperience,
    getExperienceById,
    getExperiences,
    updateExperience,
} from '../controllers/index.js'
import { storage, limits, fileFilter } from '../utils/index.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({ storage: storage, limits, fileFilter })

//Ruta para actividades:
router.post('/save-experience', upload.single('image'), saveExperience)
router.get('/get-experience/:id', getExperienceById)
router.get('/get-all-experiences', getExperiences)
router.patch('/update-experience/:id', upload.single('image'), updateExperience)

export default router
