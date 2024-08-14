import {
    generateError,
    validationSchemaJoinNonPartnerActivity,
} from '../../utils/index.js'
const joinFreeActivity = (req, res, next) => {
    try {
        const {
            attendance,
            mothers_name,
            edd,
            health_center,
            phone_number,
            email,
        } = req.body

        //Validación de datos:
        const { error } = validationSchemaJoinNonPartnerActivity.validate(
            req.body
        )

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }
        res.send({})
    } catch (error) {
        next(error)
    }
}
export default joinFreeActivity
