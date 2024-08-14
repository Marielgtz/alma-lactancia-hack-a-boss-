const validateCaptcha = (req, res) => {
    const userCaptcha = req.body.captcha

    if (req.session.captcha && userCaptcha === req.session.captcha) {
        res.status(200).send({ success: true, message: 'Captcha válido' })
    } else {
        res.status(400).send({ success: false, message: 'Captcha inválido' })
    }
}
export default validateCaptcha
