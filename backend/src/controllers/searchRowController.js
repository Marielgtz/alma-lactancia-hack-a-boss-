import { searchRow } from '../sheetDb-engine/methods/index.js'

const searchRowController = async (req, res, next) => {
    const field = req.params.field
    const value = req.params.value

    try {
        const data = await searchRow(field, value)

        if ('error' in JSON.parse(data)) {
            res.json({ message: 'Datos no encontrados' })
            return
        } else {
            res.json({ message: 'Datos encontrados', data })
        }
    } catch (err) {
        next(err)
    }
}

export default searchRowController
