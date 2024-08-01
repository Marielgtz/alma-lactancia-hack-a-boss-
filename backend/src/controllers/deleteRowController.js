import { deleteRow } from '../sheetDb-engine/methods/index.js'

const deleteRowController = async (req, res, next) => {
    const field = req.params.field
    const value = req.params.value

    try {
        const data = await deleteRow(field, value)
        if ('error' in JSON.parse(data)) {
            res.json({ message: 'No se han podido borrar los datos' })
            return
        }
        res.json({ message: 'Fila borrada correctamente', data })
    } catch (err) {
        next(err)
    }
}

export default deleteRowController
