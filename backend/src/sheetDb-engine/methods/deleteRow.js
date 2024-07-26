import client from '../client.js'

const deleteRow = async (field, value) => {
    if (!field) {
        throw new Error('El campo no existe')
    }
    if (!value) {
        throw new Error('El campo está vacío')
    }

    //Si se quiere manipular otras hojas se puede usar el tercer parámetro para especificarlo. Por defecto las hojas tendrán el nombre: "Hoja 1, Hoja 2, etc" const data = await client.delete(field, value, "Hoja 2")
    const data = await client.delete(field, value)
    return data
}

export default deleteRow
