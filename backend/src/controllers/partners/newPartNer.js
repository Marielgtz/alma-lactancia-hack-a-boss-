import { generateError } from '../../utils/index.js'
import { validationSchemaNewPartner } from '../../utils/index.js'
const newPartner = (req, res, next) => {
    try {
        const {
            nome,
            apelidos,
            enderezo,
            cp,
            cidade,
            provincia,
            telefono,
            correo_electronico,
        } = req.body

        //Validación de datos:
        const { error } = validationSchemaNewPartner.validate(req.body)

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }
        res.send({})
    } catch (error) {
        next(error)
    }
}
export default newPartner
