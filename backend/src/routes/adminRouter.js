import express from 'express'
import { googleSignIn, checkSession } from '../controllers/index.js'
const router = express.Router()

router.get('/auth/callback', googleSignIn)
router.get('/check-session', checkSession)

export default router
