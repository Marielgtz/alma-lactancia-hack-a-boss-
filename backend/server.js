import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {
    SheetDbActivities,
    images,
    partners,
    activities,
} from './src/routes/index.js'
import { notFound, manageError } from './src/middlewares/index.js'

dotenv.config()

const app = express()

//Middlewares de aplicación:
app.use(express.json())
app.use(cors())

// Rutas
app.use(SheetDbActivities)
app.use(images)
app.use(partners)
app.use(activities)

//Middlewares
app.use(notFound)
app.use(manageError)

//Server:
app.listen(process.env.PORT, () => {
    console.log(`Servidor activo en el puerto ${process.env.PORT}`)
})
