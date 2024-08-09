import { generateError } from '../../utils/index.js'
import { validationSchemaPartnerActivity } from '../../utils/index.js'
const joinPartnerActivity = (req, res, next) => {
    try {
        const {
            socio,
            nome_nai,
            nome_bebe,
            data_nacemento,
            centro_saude,
            telefono,
            correo_electronico,
            outros,
        } = req.body

        //Validación de datos:
        const { error } = validationSchemaPartnerActivity.validate(req.body)

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }
        res.send({})
    } catch (error) {
        next(error)
    }
}
export default joinPartnerActivity
