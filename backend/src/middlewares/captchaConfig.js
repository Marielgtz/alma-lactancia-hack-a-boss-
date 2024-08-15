import session from 'express-session'

const sessionMiddleware = session({
    // store: sessionStore, //Se podría configurar otras formas de almacenamiento, con bases de datos o Redis.
    secret: process.env.CAPTCHA_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Esto debe ser false si no se está usando HTTPS
        httpOnly: true, // Evitar que la cookie sea accesible desde JavaScript del lado del cliente
        sameSite: 'none', // Permite solicitudes entre diferentes dominios/puertos
    },
})
export default sessionMiddleware
