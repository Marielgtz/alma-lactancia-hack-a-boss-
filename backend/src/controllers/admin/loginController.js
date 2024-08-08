import bcrypt from 'bcrypt'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import generateError from '../../utils/generateError.js'
import dotenv from 'dotenv/config.js'
import { validationSchemaLogin } from '../../utils/index.js'

const login = async (req, res, next) => {
    try {
        const { correo_electronico, contrasinal } = req.body
        const validationObject = {
            correo_electronico,
            contrasinal,
        }

        const { error } = validationSchemaLogin.validate(validationObject)

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }

        const isPasswordOk = await bcrypt.compare(contrasinal, userDb.password)

        if (!isPasswordOk) {
            generateError('Credenciales inválidas', 400)
        }

        //El id se tendría que traer de la base de datos:
        const jwtPayload = { id: userDb.id }

        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
            expiresIn: '15d',
        })

        res.send({ message: 'Has iniciado sesión', data: { token } })
    } catch (error) {
        next(error)
    }
}

export default login
