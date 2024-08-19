import { sheets } from '../client.js'
import { generateError, getColumnLetter } from '../../utils/index.js'
import getSheetId from './getSheetId.js'

const getValues = async (
    spreadsheetId,
    range,
    fields = {},
    rowValuesToUpdate = []
) => {
    try {
        // Traer todos los datos de una hoja, o la siguiente fila vacía
        let allSheetData
        let rows
        let nextRow

        allSheetData = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        })
        //Estructura ejemplo del objeto que devuelve el método get:
        // {
        //     "range": "Sheet1!A1:B2",
        //     "majorDimension": "ROWS",
        //     "values": [
        //       ["Header1", "Header2"],
        //       ["Value1", "Value2"]
        //     ]
        //   }

        rows = allSheetData.data.values
        if (!rows || rows.length === 0) {
            return { error: 'No se encontraron datos.' }
        }
        // Localiza la siguiente fila vacía
        nextRow = rows.length + 1

        //SOLO si se proporciona un objeto fields, (const fields = {field, value, newValue, sheetName}) se buscará la celda en la que está el valor que se quiere cambiar o borrar:
        let rowIndex = -1 //Index de la fila donde está el valor buscado.
        let fieldColumnIndex //Index de la columna donde está el valor buscado.
        let updateCellRange //Rango para localizar una celda en concreto.
        let updateRowRange //Rango para una fila en concreto.
        let rowToDelete //Datos para enviar al controlador de borrar fila.
        let rowToUpdate //Fila preparada para enviar al método de actualizar.
        let cellToUpdate //Datos para enviar al controlador de actualizar celda.
        let headers //Cabeceras, es decir, fila superior con los nombres de los campos.
        let rowData //Datos de una fila en concreto.
        if (fields && fields.field && fields.value) {
            if (rows && rows.length > 0) {
                headers = rows[0]
            } else {
                generateError(
                    'No se encontraron filas en los datos de la hoja.'
                )
            }

            fieldColumnIndex = headers.indexOf(fields.field)

            if (fieldColumnIndex === -1) {
                generateError('No se ha encontrado el campo.')
            }

            // Encontrar la fila que contiene el valor buscado
            for (let i = 1; i < rows.length; i++) {
                if (rows[i][fieldColumnIndex] === fields.value) {
                    rowIndex = i + 1 // Esto será el número de la fila.
                    break
                }
            }

            if (rowIndex === -1) {
                generateError('No se ha encontrado el valor especificado.')
            }

            //Rango de la celda concreta en la que se quiere cambiar el valor buscado.
            updateCellRange = `${fields.sheetName}!${getColumnLetter(
                fieldColumnIndex + 1
            )}${rowIndex}`

            //Datos para actualizar un campo:
            const cellValue = [[fields.newValue]]
            cellToUpdate = {
                spreadsheetId,
                range: updateCellRange,
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: cellValue,
                },
            }

            //Rango de la fila en la que se quieren modificar u obtener datos:
            updateRowRange = `${fields.sheetName}!A${rowIndex}:Z${rowIndex}`

            //Datos para actualizar una fila:
            const rowValues = [rowValuesToUpdate]
            rowToUpdate = {
                spreadsheetId,
                range: updateRowRange,
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: rowValues,
                },
            }

            //Datos obtenidos de una fila concreta, basándose en un campo/valor enviado en el objeto fields.
            rowData = await sheets.spreadsheets.values.get({
                spreadsheetId,
                range: updateRowRange,
            })
            rowData = rowData.data.values[0]

            //Estructura de values
            // La API de Google Sheets espera que el objeto resource contenga una propiedad values que es una matriz bidimensional:

            // Primera dimensión: Cada fila que deseas actualizar.
            // Segunda dimensión: Los valores de cada celda en esa fila.
            // Aunque solo estés actualizando una celda, la API necesita que los datos se estructuren como una matriz de una fila y una columna.

            const sheetId = await getSheetId(spreadsheetId, fields.sheetName)

            //Datos para borrar una fila con  el método batchUpdate:

            rowToDelete = {
                spreadsheetId: spreadsheetId,
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

        return {
            headers,
            nextRow,
            allSheetData,
            rowData,
            cellToUpdate,
            rowToUpdate,
            rowToDelete,
        }
    } catch (error) {
        return { error: error.message }
    }
}
export default getValues
