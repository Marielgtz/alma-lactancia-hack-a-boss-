import fs from 'fs/promises'
import path from 'path'
import { generateError } from '../../utils/index.js'

const unpublishForm = async (req, res, next) => {
    try {
        const filePath = path.join('src', 'assets', 'formPublished.json')

        const data = await fs.readFile(filePath, 'utf8')
        let jsonData

        try {
            jsonData = JSON.parse(data)
        } catch (err) {
            throw generateError(`Error al parsear el JSON: ${err}`)
        }

        jsonData = {}

        const jsonString = JSON.stringify(jsonData, null, 2)

        await fs.writeFile(filePath, jsonString, 'utf8')

        console.log('El archivo JSON ha sido vaciado.')

        res.send({ message: 'Formulario despublicado', form: jsonData })
    } catch (error) {
        next(error)
    }
}

export default unpublishForm
