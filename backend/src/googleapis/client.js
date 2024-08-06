import { google } from 'googleapis'
const fs = require('fs')
const path = require('path')

const credentialsPath = path.join(process.cwd(), '/credentials.JSON')
const credentials = JSON.parse(fs.readFileSync(credentialsPath))

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

export default sheets
