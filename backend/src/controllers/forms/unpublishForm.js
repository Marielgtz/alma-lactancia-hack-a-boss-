import fs from 'fs/promises'
import path from 'path'

const unpublishForm = async (_req, res, next) => {
    try {
        const filePath = path.join('src', 'assets', 'formPublished.json')

        await fs.writeFile(filePath, JSON.stringify({}, null, 2), 'utf8')

        console.log('El archivo JSON ha sido vaciado.')

        res.send({ message: 'Formulario despublicado' })
    } catch (error) {
        next(error)
    }
}

export default unpublishForm
