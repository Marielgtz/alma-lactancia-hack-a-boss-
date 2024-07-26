import { createData } from '../sheetDb-engine/methods/index.js'

const createDataController = async (req, res, next) => {
    try {
        const data = await createData(req.body)
        if ('error' in JSON.parse(data)) {
            res.json({ message: 'No se han podido crear los datos', data })
            return
        }
        res.json({ message: 'Datos creados correctamente', data })
    } catch (err) {
        next(err)
    }
}

export default createDataController
