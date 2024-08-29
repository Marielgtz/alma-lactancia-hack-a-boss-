import {
    getValues,
    deleteRow,
    deleteSheet,
    getSheetId,
} from '../../googleapis/methods/index.js'

const deleteForm = async (req, res, next) => {
    try {
        const formId = req.params.formId
        const sheetToDelete = req.params.deleteSheet || undefined
        const sheetName = req.params.sheetName || undefined

        //Borrar hoja de resultados:
        if (sheetToDelete) {
            try {
                const spreadsheetIdForms = process.env.SPREADSHEET_ID_FORMS
                const sheetId = await getSheetId(spreadsheetIdForms, sheetName)
                await deleteSheet(spreadsheetIdForms, sheetId)
            } catch (error) {}
        }

        const spreadsheetId = process.env.SPREADSHEET_ID
        const fields = {
            field: 'id',
            value: formId,
            newValue: '',
            sheetName: 'Formularios',
        }
        const values = await getValues(spreadsheetId, 'Formularios', fields)
        const { rowsToDelete } = values

        Promise.all(
            rowsToDelete.map(async (row) => {
                await deleteRow(row)
            })
        )

        res.send({
            message: `formulario con id: ${formId} borrado`,
        })
    } catch (error) {
        next(error)
    }
}
export default deleteForm
