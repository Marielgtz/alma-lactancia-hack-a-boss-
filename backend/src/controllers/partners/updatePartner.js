import { generateError } from '../../utils/index.js'
import { validationSchemaNewPartner } from '../../utils/index.js'
const updatePartner = (req, res, next) => {
    try {
        let oldData //Se traerá de la base de datos.

        //Se actualizan los datos:
        const newData = {
            ...oldData,
            ...req.body,
        }

        //Se validan:
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
export default updatePartner
