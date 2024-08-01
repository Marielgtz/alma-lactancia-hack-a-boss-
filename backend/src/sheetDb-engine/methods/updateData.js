import client from '../client.js'

const updateData = async (field, value, dataToUpdate) => {
    if (!field || !value || !dataToUpdate) return null
    const updatedData = await client.update(field, value, dataToUpdate)
    return updatedData
}

export default updateData
//Para apuntar a otra hoja, ponerla como cuarto argumento:

// Update all columns where 'name' is 'Smith' to have 'score' = 99 and 'comment' = 'Griffin'
// In sheet named 'Sheet2'
// client.update(
//   'name', // column name
//   'Smith', // value to search for
//   { 'score': 99, 'comment': 'Griffin' }, // object with updates
//   'Sheet2'
// )
