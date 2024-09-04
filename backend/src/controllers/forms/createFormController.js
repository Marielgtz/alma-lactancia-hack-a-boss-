import {
    addSheetToSpreadsheet,
    configureSheet,
    saveFormData,
    allSheetData,
} from '../../googleapis/methods/index.js'
import normalizeFieldName from '../../utils/normalizeFieldName.js'

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
        const values = await allSheetData(spreadsheetId, 'Formularios')
        const { nextEmptyRow } = values

        //Guardo el formulario en una hoja de Google.
        saveFormData(spreadsheetId, formData, nextEmptyRow, 'Formularios')

        //Lógica para crear una hoja y obtener el id:
        const newSheetId = await addSheetToSpreadsheet(
            spreadsheetIdForms,
            normalizeFieldName(formData.formName)
        )
        //Inserto los campos en la hoja:
        const formLabels = formData.fields.map((field) => {
            return normalizeFieldName(field.label)
        })
        await configureSheet(
            spreadsheetIdForms,
            newSheetId,
            formData.fields.length,
            formLabels
        )
        //Edito la estructura de datos para que coincida con la esperada en el front:
        let dataToSend = {}
        dataToSend[formDataString.formId] = {
            formName: formDataString.formName,
            fields: formDataString.fields,
        }

        res.status(200).json({
            message:
                'Formulario generado y guardado correctamente. Creada hoja de respuestas',
            form: dataToSend,
        })
    } catch (error) {
        next(error)
    }
}
export default createFormController
