import {
    deleteRow,
    getValues,
    saveFormData,
    updateRow,
} from '../../googleapis/methods/index.js'
import { getColumnLetter } from '../../utils/index.js'

const updateForm = async (req, res, next) => {
    try {
        const formDataString = req.body
        const spreadsheetId = process.env.SPREADSHEET_ID
        const spreadsheetIdForms = process.env.SPREADSHEET_ID_FORMS

        //Datos nuevos:
        const formData =
            typeof formDataString === 'string'
                ? JSON.parse(formDataString)
                : formDataString

        //Extraigo todos los datos antiguos del formulario:
        const fields = {
            field: 'id',
            value: formData.formId,
            newValue: '',
            sheetName: 'Formularios',
        }
        const matchingData = await getValues(
            spreadsheetId,
            'Formularios',
            fields
        )
        const { rowsData, rowsToDelete } = matchingData

        // Los borro de la hoja:
        await Promise.all(
            rowsToDelete.map(async (row) => {
                await deleteRow(row)
            })
        )

        //Obtengo la siguiente fila vacía en la hoja de Google correspondiente:
        const values = await getValues(spreadsheetId, 'Formularios')
        const { nextRow } = values

        // //Creo el objeto combinado:
        const updatedFormData = {
            formId: rowsData[0][0],
            formName: rowsData[0][1],
            fields: formData.fields,
        }

        // //Guardo el formulario actualizado.
        saveFormData(spreadsheetId, updatedFormData, nextRow, 'Formularios')

        //Manejo de la hoja de resultados:
        //Obtengo las cabeceras antiguas:
        const resultsSheet = await getValues(
            spreadsheetIdForms,
            updatedFormData.formName
        )
        const { headers } = resultsSheet

        //Y las nuevas:
        const headersToAdd = updatedFormData.fields.map((field) => field.label)

        //Inserto todas las cabeceras en la hoja de resultados respetando el orden:
        const updatedHeaders = [...headers, ...headersToAdd].reduce(
            (acc, field) => {
                if (!acc.some((item) => item === field)) {
                    acc.push(field)
                }
                return acc
            },
            []
        )

        const dataToUpdateRow = {
            spreadsheetId: spreadsheetIdForms,
            range: `${updatedFormData.formName}!A1:${getColumnLetter(
                updatedHeaders.length
            )}1`,
            valueInputOption: 'RAW',
            resource: {
                values: [updatedHeaders],
            },
        }
        await updateRow(dataToUpdateRow)

        //Envío los datos actualizados del formulario al front:
        //Edito la estructura de datos para que coincida con la esperada en el front:
        let dataToSend = {}
        dataToSend[formDataString.formId] = {
            formName: formDataString.formName,
            fields: formDataString.fields,
        }

        res.status(200).json({
            message: 'Formulario y hoja de respuestas, actualizados',
            apdatedForm: dataToSend,
        })
    } catch (error) {
        next(error)
    }
}
export default updateForm
