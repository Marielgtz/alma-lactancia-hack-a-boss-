import { updateData } from '../sheetDb-engine/methods/index.js'

const updateDataController = async (req, res, next) => {
    const { field, value, dataToUpdate } = req.body

    try {
        const data = await updateData(field, value, dataToUpdate)

        if ('error' in JSON.parse(data)) {
            res.json({ message: 'Alguno de los campos no coincide' })
            return
        } else {
            res.json({ message: 'Datos actualizados', data })
        }
    } catch (err) {
        next(err)
    }
}

export default updateDataController
