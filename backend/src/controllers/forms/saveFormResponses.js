import {
    allSheetData,
    getCoordinates,
    updateCell,
} from '../../googleapis/methods/index.js'
import { normalizeFieldName } from '../../utils/index.js'

const saveFormResponses = async (req, res, next) => {
    try {
        let { sheetName } = req.params
        sheetName = normalizeFieldName(sheetName)
        const formResponses = req.body
        const spreadsheetIdForms = process.env.SPREADSHEET_ID_FORMS

        const { nextEmptyRow, rows, headers } = await allSheetData(
            spreadsheetIdForms,
            sheetName
        )
        await Promise.all(
            Object.entries(formResponses).map(async ([key, value]) => {
                const { fieldColumnIndex } = await getCoordinates(
                    rows,
                    headers,
                    normalizeFieldName(key),
                    value
                )

                // Inserto las respuestas en las celdas correspondientes:
                await updateCell(
                    spreadsheetIdForms,
                    sheetName,
                    fieldColumnIndex,
                    0,
                    value,
                    nextEmptyRow
                )
            })
        )

        res.status(200).json({
            message: 'Respuestas del formulario guardadas exitosamente',
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default saveFormResponses
