import sheetdb from 'sheetdb-node'
import dotenv from 'dotenv/config'

const config = {
    address: process.env.API_URL,
}

const client = sheetdb(config)

export default client
