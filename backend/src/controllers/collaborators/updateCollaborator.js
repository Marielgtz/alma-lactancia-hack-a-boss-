import { generateError } from '../../utils/index.js'
import { validationSchemaNewCollaborator } from '../../utils/index.js'
import path from 'path'
import fs from 'fs/promises'

const updateCollaborator = async (req, res, next) => {
    try {
        let oldData //Se traerá de la base de datos.

        //Se actualizan los datos:
        const newData = {
            ...oldData,
            ...req.body,
            ...{ collaboratorImage: req.file.filename && req.file.filename },
        }

        const dataToValidate = {
            nome: newData.nome,
            apelidos: newData.apelidos,
            descripcion: newData.descripcion,
            rol: newData.rol || '',
        }
        //Se validan:
        const { error } =
            validationSchemaNewCollaborator.validate(dataToValidate)

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }

        //Si envías una nueva foto, se borra la anterior de la carpeta uploads:
        if (req.file) {
            const newImagePath = path.join('src', 'uploads', req.file.filename)
            const oldImagePath = path.join(
                'src',
                'uploads',
                newData.collaboratorImage
            )

            try {
                // Si la imagen es diferente, borra la antigua:
                if (
                    newImagePath &&
                    oldImagePath &&
                    newImagePath !== oldImagePath
                ) {
                    await fs.unlink(oldImagePath)
                }
            } catch (error) {
                console.error(
                    'Error al acceder o eliminar la imagen actual:',
                    error.message
                )
                generateError(error.message)
            }
        }

        res.send({})
    } catch (error) {
        next(error)
    }
}
export default updateCollaborator
