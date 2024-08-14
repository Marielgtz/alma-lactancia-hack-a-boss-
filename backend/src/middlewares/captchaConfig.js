import session from 'express-session'

const sessionMiddleware = session({
    // store: sessionStore, //Se podría configurar otras formas de almacenamiento, con bases de datos o Redis.
    secret: process.env.CAPTCHA_SECRET,
    resave: false,
    saveUninitialized: false,
})
export default sessionMiddleware
