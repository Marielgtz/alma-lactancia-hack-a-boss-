import {
    generateError,
    validationSchemaNewExperiences,
} from '../../utils/index.js'
import { insertRow, allSheetData } from '../../googleapis/methods/index.js'
import { v4 as uuidv4 } from 'uuid'

const saveExperience = async (req, res, next) => {
    try {
        const sheetId = process.env.SPREADSHEET_ID
        const id = uuidv4()

        const { text } = req.body
        const image = req.file?.filename || 'sin imagen'

        const dataToInsert = [[id, text, image]]

        // Validación de datos:
        const { error } = validationSchemaNewExperiences.validate(req.body)

        if (error) {
            error.message = error.details[0].message
            generateError(error.message)
        }
        const sheetName = 'Experiencias'
        const values = await allSheetData(sheetId, sheetName)

        const { nextEmptyRow } = values

        const experienceSaved = await insertRow(
            sheetId,
            sheetName,
            nextEmptyRow,
            dataToInsert
        )
        res.send({
            message: 'Experiencia guardada correctamente en la hoja de cálculo',
            data: experienceSaved,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export default saveExperience
