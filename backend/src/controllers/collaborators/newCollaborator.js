import { generateError } from '../../utils/index.js'
import { validationSchemaNewCollaborator } from '../../utils/index.js'
import { getValues, insertRow } from '../../googleapis/methods/index.js'

const newCollaborator = async (req, res, next) => {
    try {
        const sheetId = process.env.SPREADSHEET_ID

        const { name, surname, description, role, team } = req.body

        const collaboratorImage = req.file?.filename || 'sin imagen'
        const dataToInsert = [
            [name, surname, description, role, collaboratorImage],
        ]

        // Validación de datos:
        const { error } = validationSchemaNewCollaborator.validate(req.body)

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }

        if (!team) {
            const values = await getValues(sheetId, 'Colaboradores')

            const { nextRow } = values

            const collaboratorAdded = await insertRow(
                sheetId,
                'Colaboradores',
                nextRow,
                dataToInsert
            )
            res.send({
                message: 'Colaborador añadido correctamente',
                collaboratorAdded,
            })
        } else {
            const values = await getValues(sheetId, 'Miembros')

            const { nextRow } = values

            const collaboratorAdded = await insertRow(
                sheetId,
                'Miembros',
                nextRow,
                dataToInsert
            )
            res.send({
                message: 'Miembro del equipo añadido correctamente',
                collaboratorAdded,
            })
        }
    } catch (error) {
        next(error.message)
    }
}
export default newCollaborator
