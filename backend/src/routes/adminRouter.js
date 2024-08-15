import express from 'express'
import { googleSignIn } from '../controllers/index.js'
const router = express.Router()

router.get('/auth/callback', googleSignIn)

export default router
