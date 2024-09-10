import express from 'express'
import {
    getInstagramPost,
    saveInstagramPost,
    unpublishInstagramPost,
} from '../controllers/index.js'
const router = express.Router()

//Ruta para posts de Instagram:
router.get('/get-instagram-post/:postNumber', getInstagramPost)
router.post('/save-instagram-post/:postNumber', saveInstagramPost)
router.get('/unpublish-instagram-post/:postNumber', unpublishInstagramPost)

export default router
