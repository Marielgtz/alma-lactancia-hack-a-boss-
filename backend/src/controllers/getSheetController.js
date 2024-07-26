import { getSheet } from '../sheetDb-engine/methods/index.js'

const getSheetController = async (req, res, next) => {
    const sheetName = req.params.sheetName

    try {
        const data = await getSheet(sheetName)
        if ('error' in JSON.parse(data)) {
            res.json({ message: `Hoja ${sheetName} no encontrada` })
            return
        }
        res.json({ message: `Hoja ${sheetName} encontrada`, data })
    } catch (err) {
        next(err)
    }
}

export default getSheetController
//Nota: En express los espacios en las URLs suelen codificarse como %20
