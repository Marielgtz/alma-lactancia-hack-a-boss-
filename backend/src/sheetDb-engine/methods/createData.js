import client from '../client.js'

const createData = async (dataToAdd) => {
    if (!dataToAdd) return

    //Retorna el número de filas creadas:
    const data = await client.create(dataToAdd)

    return data
}

export default createData
// Adds single row to worksheet named "Sheet3"
//Para diferentes hojas:
// client.create({ player: "William", score: 75 }, "Sheet2")
