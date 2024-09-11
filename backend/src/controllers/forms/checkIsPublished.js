import fs from 'fs/promises'
import path from 'path'
import { generateError } from '../../utils/index.js'

const checkIsPublished = async (req, res, next) => {
    try {
        const jsonNumber = req.params.jsonNumber.toString()
        const formId = req.params.formId
        const filePath = path.join(
            'src',
            'assets',
            'forms',
            `formPublished${jsonNumber}.json`
        )
        const data = await fs.readFile(filePath, 'utf8')

        let jsonData
        let isPublished
        try {
            jsonData = JSON.parse(data)
        } catch (err) {
            generateError(`Error al parsear el JSON: ${err.message}`)
        }

        if (jsonData && jsonData.formId === formId) {
            console.log('El formId coincide.')
            isPublished = true
        } else {
            console.log('El formId no coincide.')
            isPublished = false
        }

        res.send({
            isPublished: isPublished,
            publishedFormId: jsonData.formId,
        })
    } catch (error) {
        next(error)
    }
}
export default checkIsPublished
