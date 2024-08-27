import {
    getSheetId,
    getValues,
    insertRow,
} from '../../googleapis/methods/index.js'
import { generateError } from '../../utils/index.js'

const saveFormResponses = async (req, res, next) => {
    try {
        const { sheetName } = req.params
        const formResponses = req.body
        const spreadsheetIdForms = process.env.SPREADSHEET_ID_FORMS

        // Obtengo el ID de la hoja de cálculo según el formulario:
        const sheetId = await getSheetId(spreadsheetIdForms, sheetName)
        if (!sheetId) {
            generateError('Hoja no encontrada para el formulario')
        }

        //Preparo los datos:
        const values = [Object.values(formResponses)]

        //Obtengo la siguiente fila vacía:
        const data = await getValues(spreadsheetIdForms, sheetName)
        const { nextRow } = data

        // Inserto las respuestas en la hoja de cálculo
        await insertRow(spreadsheetIdForms, sheetName, nextRow, values)

        res.status(200).json({
            message: 'Respuestas del formulario guardadas exitosamente',
        })
    } catch (error) {
        next(error)
    }
}

export default saveFormResponses
