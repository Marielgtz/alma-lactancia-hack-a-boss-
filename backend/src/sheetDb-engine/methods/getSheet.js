import client from '../client.js'

const getSheet = async (sheetName) => {
    if (!sheetName) return

    const sheetData = await client.read({
        sheet: sheetName,
    })

    return sheetData
}

export default getSheet

//Se le pueden pasar estos parámetros:
// limit - limit number of results
// offset - start from N first record
// search - object with search params
// sheet - get data from named workshee
//client.read({ limit: 2, sheet: "Sheet2" })
