import express from 'express'
import { loginController } from '../controllers/index.js'
const router = express.Router()

router.post('/admin-login', loginController)

export default router
