import express from 'express'
import { storage, limits, fileFilter } from '../utils/index.js'
import multer from 'multer'
import {
    googleSignIn,
    checkSession,
    logout,
    saveHomeData,
    getHomeData,
} from '../controllers/index.js'

const upload = multer({ storage: storage, limits, fileFilter })
const router = express.Router()

router.get('/auth/callback', googleSignIn)
router.get('/check-session', checkSession)
router.post('/logout', logout)
router.patch('/update-home-data', upload.array('images', 4), saveHomeData)
router.get('/get-home-data', getHomeData)

export default router
