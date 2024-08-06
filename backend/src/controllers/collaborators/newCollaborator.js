import { generateError } from '../../utils/index.js'
import { validationSchemaNewCollaborator } from '../../utils/index.js'
const newCollaborator = (req, res, next) => {
    try {
        const { nome, apelidos, descripcion, rol } = req.body

        const collaboratorImage = req.file.filename

        // Validación de datos:
        const { error } = validationSchemaNewCollaborator.validate(req.body)

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }
        res.send({})
    } catch (error) {
        next(error)
    }
}
export default newCollaborator
