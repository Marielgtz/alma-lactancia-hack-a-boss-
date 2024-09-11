import express from 'express'
import {
    googleSignIn,
    checkSession,
    logout,
    saveHomeData,
    getHomeData,
} from '../controllers/index.js'
const router = express.Router()

router.get('/auth/callback', googleSignIn)
router.get('/check-session', checkSession)
router.post('/logout', logout)
router.post('/save-home-data', saveHomeData)
router.get('/get-home-data', getHomeData)

export default router
