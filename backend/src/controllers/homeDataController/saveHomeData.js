import fs from 'fs/promises'
import path from 'path'

const homeData = async (req, res, next) => {
    try {
        const filePath = path.join('src', 'assets', 'homeData', `home.json`)
        await fs.writeFile(filePath, JSON.stringify(req.body, null, 2))

        res.send({
            message: 'Datos de "Home", guardados correctamente',
            post: req.body,
        })
    } catch (error) {
        next(error)
    }
}
export default homeData
