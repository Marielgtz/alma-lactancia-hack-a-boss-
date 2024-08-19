import { sheets } from '../client.js'

const updateRow = async (rowToUpdate) => {
    const result = await sheets.spreadsheets.values.update(rowToUpdate)
    return result
}
export default updateRow

//Estructura del objeto dataToUpdate:
//Ejemplo:
// const dataToUpdate = {
//     spreadsheetId,
//     range,
//     valueInputOption,
//     resource: {
//         values,
//     },
// }
