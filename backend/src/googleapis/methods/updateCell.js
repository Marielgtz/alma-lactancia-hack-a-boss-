import { sheets } from '../client.js'

const updateCell = async (cellToUpdate) => {
    const result = await sheets.spreadsheets.values.update(cellToUpdate)
    return result
}
export default updateCell

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
