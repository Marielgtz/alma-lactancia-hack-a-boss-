import client from '../client.js'

const searchRow = async (field, value) => {
    if (!field || !value) return

    const data = await client.read({
        search: { [field]: value },
    })

    return data
}

export default searchRow
//Se le pueden añadir estos argumentos para especificar hoja o límite:
// client.read({
//     limit: 2,
//     search: { 'player': 'Smith', 'score': 41 },
//     sheet: 'Sheet2'
//   }
