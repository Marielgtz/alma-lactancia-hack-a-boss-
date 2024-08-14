import { sheets } from '../client.js'

const deleteRow = async (dataToDelete) => {
    try {
        await sheets.spreadsheets.batchUpdate(dataToDelete)

        console.log('Fila borrada.')
    } catch (error) {
        console.error('Error al borrar la fila:', error.message)
    }
}
export default deleteRow
