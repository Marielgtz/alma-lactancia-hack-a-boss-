import {
    generateError,
    validationSchemaNonPartnerActivity,
} from '../../utils/index.js'
const freeActivity = (req, res, next) => {
    try {
        const {
            asistencia,
            nome_nai,
            fpp,
            centro_saude,
            telefono,
            correo_electronico,
        } = req.body

        //Validación de datos:
        const { error } = validationSchemaNonPartnerActivity.validate(req.body)

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }
        res.send({})
    } catch (error) {
        next(error)
    }
}
export default freeActivity
