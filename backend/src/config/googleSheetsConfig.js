const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const dotenv = require('dotenv');

dotenv.config();

const auth = new GoogleAuth({
  keyFile: 'path/to/your-service-account-file.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

module.exports = sheets;
