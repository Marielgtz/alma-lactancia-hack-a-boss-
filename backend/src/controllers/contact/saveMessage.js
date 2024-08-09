import { generateError, validationSchemaNewMessage } from '../../utils/index.js'
import { getValues, insertRow } from '../../googleapis/methods/index.js'

const saveMessage = async (req, res, next) => {
    try {
        const sheetId = process.env.SPREADSHEET_ID

        const { name, surname, email, subject, comments } = req.body

        const dataToInsert = [[name, surname, email, subject, comments]]

        // Validación de datos:
        const { error } = validationSchemaNewMessage.validate(req.body)

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }
        const sheetName = 'Contacto'
        const values = await getValues(sheetId, sheetName)

        const { nextRow } = values

        const collaboratorAdded = await insertRow(
            sheetId,
            sheetName,
            nextRow,
            dataToInsert
        )
        res.send({
            message: 'Mensaje guardado correctamente',
            collaboratorAdded,
        })
    } catch (error) {
        next(error)
    }
}
export default saveMessage
