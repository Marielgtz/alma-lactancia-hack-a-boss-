import express from 'express'
const router = express.Router()

//Ruta para manejar datos de actividades:
router.post('/activities')
router.delete('/activities')
router.get('/activities')

export default router
