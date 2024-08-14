import { sheets } from '../client.js'
import { getColumnLetter } from '../../utils/index.js'
import getSheetId from './getSheetId.js'

const getValues = async (spreadsheetId, range, fields = {}) => {
    try {
        // Traer todos los datos de una hoja, o la siguiente fila vacía, SOLO si han pasado un rango (Habrá que pasar range como null):
        let allData
        let rows
        let nextRow
        if (range) {
            allData = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range,
            })
            rows = allData.data.values
            if (!rows || rows.length === 0) {
                return { error: 'No se encontraron datos.' }
            }
            // Localiza la siguiente fila vacía
            nextRow = rows.length + 1
        }

        //SOLO si se proporciona un objeto fields, (const fields = {field, value, newValue, sheetName}) se buscará la celda en la que está el valor que se quiere cambiar o borrar:
        let rowIndex = -1
        let fieldColumnIndex
        let updateRange
        let dataToDelete
        let dataToUpdate

        if (fields && fields.field && fields.value) {
            const headers = rows[0]
            fieldColumnIndex = headers.indexOf(fields.field)

            if (fieldColumnIndex === -1) {
                return { error: 'No se ha encontrado el campo.' }
            }

            // Encontrar la fila que contiene el valor buscado
            for (let i = 1; i < rows.length; i++) {
                if (rows[i][fieldColumnIndex] === fields.value) {
                    rowIndex = i + 1 // Esto será el número de la fila.
                    break
                }
            }

            if (rowIndex === -1) {
                return { error: 'No se ha encontrado el valor especificado.' }
            }

            updateRange = `${fields.sheetName}${getColumnLetter(
                fieldColumnIndex + 1
            )}${rowIndex}`

            //Datos para actualizar un campo:
            const values = [[fields.newValue]]
            dataToUpdate = {
                spreadsheetId,
                range: updateRange,
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values,
                },
            }
            //Estructura de values
            // La API de Google Sheets espera que el objeto resource contenga una propiedad values que es una matriz bidimensional:

            // Primera dimensión: Cada fila que deseas actualizar.
            // Segunda dimensión: Los valores de cada celda en esa fila.
            // Aunque solo estés actualizando una celda, la API necesita que los datos se estructuren como una matriz de una fila y una columna.

            const sheetId = await getSheetId(spreadsheetId, fields.sheetName)
            //Datos para borrar una fila con  el método batchUpdate:
            if (rowIndex === -1) {
                dataToDelete = {
                    spreadsheetId,
                    resource: {
                        requests: [
                            {
                                deleteDimension: {
                                    range: {
                                        sheetId: sheetId,
                                        dimension: 'ROWS',
                                        startIndex: rowIndex - 1,
                                        endIndex: rowIndex,
                                    },
                                },
                            },
                        ],
                    },
                }
            }
        }
        return {
            nextRow,
            allData,
            dataToUpdate,
            dataToDelete,
        }
    } catch (error) {
        return { error: error.message }
    }
}
export default getValues
