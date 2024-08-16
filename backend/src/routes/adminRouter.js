import express from 'express'
import { googleSignIn, checkSession, logout } from '../controllers/index.js'
const router = express.Router()

router.get('/auth/callback', googleSignIn)
router.get('/check-session', checkSession)
router.post('/logout', logout)

export default router
