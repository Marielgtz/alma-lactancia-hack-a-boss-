import { getValues } from '../../googleapis/methods/index.js'
import groupDataById from '../../utils/groupDataById.js'

const getFormById = async (req, res, next) => {
    try {
        const formId = req.params.formId
        const spreadsheetId = process.env.SPREADSHEET_ID
        const fields = {
            field: 'id',
            value: formId,
            newValue: '',
            sheetName: 'Formularios',
        }
        const values = await getValues(spreadsheetId, 'Formularios', fields)
        const { rowsData } = values

        const form = groupDataById(rowsData)

        //Formateo los datos para que coincidan con la estructura esperada en el front:
        const dataToSend = {
            formName: Object.entries(form)[0][1].formName,
            fields: Object.entries(form)[0][1].fields,
        }

        res.send({
            message: `formulario con id: ${formId} obtenido`,
            form: dataToSend,
        })
    } catch (error) {
        next(error)
    }
}
export default getFormById
