import { getColumnLetter } from '../../utils/index.js'
import { sheets } from '../client.js'

const updateCell = async (
    spreadsheetId,
    sheetName,
    fieldColumnIndex,
    valueRowIndex,
    newValue,
    nextEmptyRow
) => {
    let cellToUpdate = {}
    if (nextEmptyRow) {
        const newCellRange = `${sheetName}!${getColumnLetter(
            fieldColumnIndex + 1
        )}${nextEmptyRow}`

        const cellNewValue = [[newValue]]
        cellToUpdate = {
            spreadsheetId: spreadsheetId,
            range: newCellRange,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: cellNewValue,
            },
        }
    } else {
        const updateCellRange = `${sheetName}!${getColumnLetter(
            fieldColumnIndex + 1
        )}${valueRowIndex}`

        const cellUpdatedValue = [[newValue]]
        cellToUpdate = {
            spreadsheetId,
            range: updateCellRange,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: cellUpdatedValue,
            },
        }
    }
    const result = await sheets.spreadsheets.values.update(cellToUpdate)
    console.log('Las celdas han sido actualizadas')
    return result
}
export default updateCell
