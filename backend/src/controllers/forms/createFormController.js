import {
    addSheetToSpreadsheet,
    configureSheet,
    getValues,
    saveFormData,
} from '../../googleapis/methods/index.js'

const createFormController = async (req, res, next) => {
    try {
        const formDataString = req.body
        const spreadsheetId = process.env.SPREADSHEET_ID
        const spreadsheetIdForms = process.env.SPREADSHEET_ID_FORMS
        const formData =
            typeof formDataString === 'string'
                ? JSON.parse(formDataString)
                : formDataString

        //Obtener la siguiente fila vacía:
        const values = await getValues(spreadsheetId, 'Formularios')
        const { nextRow } = values

        //Guardo el formulario en una hoja de Google.
        saveFormData(spreadsheetId, formData, nextRow, 'Formularios')

        //Lógica para crear una hoja y obtener el id:
        const newSheetId = await addSheetToSpreadsheet(
            spreadsheetIdForms,
            formData.formName
        )
        //Inserto los campos en la hoja:
        const formLabels = formData.fields.map((field) => {
            return field.label
        })
        await configureSheet(
            spreadsheetIdForms,
            newSheetId,
            formData.fields.length,
            formLabels
        )

        res.status(200).json({
            message:
                'Formulario generado y guardado correctamente. Creada hoja de respuestas',
            form: formDataString,
        })
    } catch (error) {
        next(error)
    }
}
export default createFormController
