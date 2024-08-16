import express from 'express'
import dotenv from 'dotenv/config'
import cors from 'cors'
import { sessionMiddleware } from './src/middlewares/index.js'
import {
    partners,
    activities,
    login,
    calendar,
    collaborator,
    contact,
    captcha,
} from './src/routes/index.js'
import { notFound, manageError } from './src/middlewares/index.js'

const app = express()

//Middlewares de aplicación:
app.use(express.json()) //Para manejar application/json en las solicitudes.
app.use(express.urlencoded({ extended: true })) //Para manejar application/x-www-form-urlencoded en las solicitudes.
app.use(
    cors({
        origin: true, //Acepta todas las entradas.
        credentials: true, // Esto permite que las cookies y credenciales se envíen
    })
)
app.use(sessionMiddleware)

// Rutas
app.use(partners)
app.use(activities)
app.use(login)
app.use(calendar)
app.use(collaborator)
app.use(contact)
app.use(captcha)

//Middlewares
app.use(notFound)
app.use(manageError)

//Server:
app.listen(process.env.PORT, () => {
    console.log(`Servidor activo en el puerto ${process.env.PORT}`)
})
