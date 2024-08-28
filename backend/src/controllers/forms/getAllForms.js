import { getValues } from '../../googleapis/methods/index.js'
import { groupDataById } from '../../utils/index.js'

const getAllForms = async (req, res, next) => {
    try {
        const spreadsheetId = process.env.SPREADSHEET_ID

        // Traigo todos los datos de la hoja de formularios:
        const data = await getValues(spreadsheetId, 'Formularios')
        const { allSheetData } = data
        const values = allSheetData.data.values

        // Agrupo los formularios por id:
        const groupedData = groupDataById(values)

        res.send({ message: 'formularios obtenidos', forms: groupedData })
    } catch (error) {
        next(error)
    }
}
export default getAllForms
