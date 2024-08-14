import express from 'express'
import { generateCaptcha } from '../controllers/index.js'
const router = express.Router()

router.get('/generate-captcha', generateCaptcha)

export default router
