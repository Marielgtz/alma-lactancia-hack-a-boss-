const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const activitiesRouter = require('./routes/activities');
const contactRouter = require('./routes/contact');
const calendarRouter = require('./routes/calendar');
const homeRouter = require('./routes/home');

const server = express();



// Usar los middlewares


// Definir rutas cuando se decida cuales serán exactamente, comienzo por básicas.
server.use('/activities', activitiesRouter);
server.use('/contact', contactRouter);
server.use('/calendar', calendarRouter);
server.use('/home', homeRouter);




// mirar para  poner el generatorError comentado con Guille y hacerlo más genérico
server.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Manejar otros errores
server.use((err, req, res, next) => {
  // Configurar errores solo en desarrollo
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err : {};

  // Renderizar la página de error
  res.status(err.status || 500);
  res.render('error');
});

module.exports = server;
