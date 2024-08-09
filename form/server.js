const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/contact', (req, res) => {
    const { name, surname, email, subject, message } = req.body;

    // Aquí puedes agregar la lógica para manejar los datos del formulario
    console.log('Datos recibidos:', { name, surname, email, subject, message });

    // Enviar una respuesta de éxito
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
