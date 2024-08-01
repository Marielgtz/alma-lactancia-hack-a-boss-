import Joi from 'joi'

const validationSchemaNewPartner = {
    nome: Joi.string().max(15).required(),
    apelidos: Joi.string().max(30).required(),
    enderezo: Joi.string().min(6).max(255).required(),
    cd: Joi.string().min(5).required(),
    cidade: Joi.string().max(20).required(),
    provincia: Joi.string().max(20).required(),
    telefono: Joi.string().min(9).required(),
    correo_electronico: Joi.string().email().required(),
}

const validationSchemaPartnerActivity = {
    socio: Joi.boolean().required(),
    nome_bebe: Joi.string().max(15).required(),
    nome_nai: Joi.string().max(30).required(),
    data_nacemento: Joi.string()
        .pattern(/^(\d{2})\/(\d{2})\/(\d{4})$/)
        .required(),
    centro_saude: Joi.string().max(50).required(),
    outros: Joi.string().max(255).required(),
    telefono: Joi.string().min(9).required(),
    correo_electronico: Joi.string().email().required(),
}
const validationSchemaNonPartnerActivity = {
    asistencia: Joi.boolean().required(),
    nome_nai: Joi.string().max(30).required(),
    fpp: Joi.string()
        .pattern(/^(\d{2})\/(\d{2})\/(\d{4})$/)
        .required(),
    centro_saude: Joi.string().max(50).required(),
    telefono: Joi.string().min(9).required(),
    correo_electronico: Joi.string().email().required(),
}

//Exporto las variables:
export {
    validationSchemaNewPartner,
    validationSchemaPartnerActivity,
    validationSchemaNonPartnerActivity,
}
