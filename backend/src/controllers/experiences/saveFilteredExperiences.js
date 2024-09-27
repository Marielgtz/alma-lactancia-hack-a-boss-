import fs from 'fs/promises'
import path from 'path'

const saveFilteredExperiences = async (req, res, next) => {
    try {
        const filePath = path.join(
            'src',
            'controllers',
            'experiences',
            `filteredExperiences.json`
        )
        await fs.writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf8')
        res.send({
            message: 'Experiencias filtradas guardadas correctamente',
            data: filePath,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export default saveFilteredExperiences
