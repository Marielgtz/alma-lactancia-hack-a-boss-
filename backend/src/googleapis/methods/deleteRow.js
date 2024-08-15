import { generateError } from '../../utils/index.js'
import { sheets } from '../client.js'

const deleteRow = async (dataToDelete) => {
    try {
        const response = await sheets.spreadsheets.batchUpdate(dataToDelete)
        console.log('Fila borrada.', response)
    } catch (error) {
        generateError('Error al borrar la fila:')
    }
}
export default deleteRow
