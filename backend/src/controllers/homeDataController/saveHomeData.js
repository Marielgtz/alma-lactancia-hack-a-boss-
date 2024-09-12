import fs from 'fs/promises'
import path from 'path'

const homeData = async (req, res, next) => {
    try {
        //Accedo al json almacenado y lo parseo:
        const filePath = path.join('src', 'assets', 'homeData', `home.json`)
        const data = await fs.readFile(filePath, 'utf8')
        const oldJsonData = JSON.parse(data)

        //Manejo las referencias de las imágenes nuevas (si las hay) y las antiguas:
        let imageHome = oldJsonData.home.imageHome || 'sin imagen'
        let logo = oldJsonData.generalSettings.logo || 'sin imagen'
        if (req.files) {
            imageHome = req.files[0].filename
            logo = req.files[1].filename
        }

        //Creo el objeto combinado:
        const newJsonData = {
            home: {
                ...(oldJsonData.home || {}),
                ...req.body.home,
                imageHome: imageHome,
            },
            generalSettings: {
                ...(oldJsonData.generalSettings || {}),
                ...req.body.generalSettings,
                logo: logo,
            },
        }

        //Actualizo los datos en el json:
        await fs.writeFile(filePath, JSON.stringify(newJsonData, null, 2))

        //Borro las imágenes físicas si las nuevas son diferentes a las antiguas:
        if (req.files) {
            if (
                req.files[0]?.filename &&
                oldJsonData.home.imageHome !== 'sin imagen' &&
                req.files[0]?.filename !== oldJsonData.home.imageHome
            ) {
                const imageHomePath = path.join(
                    'src',
                    'assets',
                    'images',
                    oldJsonData.home.imageHome
                )
                await fs.unlink(imageHomePath)
            }
            if (
                req.files[1]?.filename &&
                oldJsonData.generalSettings.logo !== 'sin imagen' &&
                req.files[1]?.filename !== oldJsonData.generalSettings.logo
            ) {
                const imageLogoPath = path.join(
                    'src',
                    'assets',
                    'images',
                    oldJsonData.generalSettings.logo
                )
                await fs.unlink(imageLogoPath)
            }
        }

        res.send({
            message: 'Datos de "Home", guardados correctamente',
            data: newJsonData,
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export default homeData

//req.files será un array de objetos, cada objeto con cada imagen que se reciba desde el front:
// [
//     {
//       fieldname: 'images',
//       originalname: 'image1.jpg',
//       encoding: '7bit',
//       mimetype: 'image/jpeg',
//       destination: './uploads',
//       filename: 'images-1661288000001.jpg',
//       path: 'uploads/images-1661288000001.jpg',
//       size: 12345
//     },
//     {
//       fieldname: 'images',
//       originalname: 'image2.png',
//       encoding: '7bit',
//       mimetype: 'image/png',
//       destination: './uploads',
//       filename: 'images-1661288000002.png',
//       path: 'uploads/images-1661288000002.png',
//       size: 23456
//     },
//     {
//       fieldname: 'images',
//       originalname: 'image3.gif',
//       encoding: '7bit',
//       mimetype: 'image/gif',
//       destination: './uploads',
//       filename: 'images-1661288000003.gif',
//       path: 'uploads/images-1661288000003.gif',
//       size: 34567
//     }
//   ]
