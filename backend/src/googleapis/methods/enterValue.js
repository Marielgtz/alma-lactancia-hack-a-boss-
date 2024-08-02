import sheets from '../client'

const enterValue = async (dataToUpdate) => {
    const result = await sheets.spreadsheets.values.update(dataToUpdate)
    return result
}
export default enterValue

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
