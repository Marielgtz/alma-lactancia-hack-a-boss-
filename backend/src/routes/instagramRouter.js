import express from 'express'
import { getPost } from '../controllers/index.js'
const router = express.Router()

router.get('/get-instagram-post', getPost)

export default router
