import { generateError } from '../../utils/index.js'

const getPost = async (req, res, next) => {
    const { instagramUrl } = req.body

    if (!instagramUrl) {
        generateError('No se proporcionó ninguna URL')
    }

    try {
        const response = await fetch(
            `https://graph.facebook.com/v15.0/instagram_oembed?url=${encodeURIComponent(
                instagramUrl
            )}&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
        )

        if (!response.ok) {
            generateError('No se pudo obtener la publicación de Instagram')
        }

        const data = await response.json()
        const embeddedHtml = data.html

        res.json({ embeddedHtml })
    } catch (error) {
        next(error)
    }
}
export default getPost
