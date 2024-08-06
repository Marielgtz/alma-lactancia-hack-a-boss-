import Joi from 'joi'

//Socios/as:
const validationSchemaNewPartner = Joi.object({
    nome: Joi.string().max(15).required(),
    apelidos: Joi.string().max(30).required(),
    enderezo: Joi.string().min(6).max(255).required(),
    cd: Joi.string().min(5).required(),
    cidade: Joi.string().max(20).required(),
    provincia: Joi.string().max(20).required(),
    telefono: Joi.string().min(9).required(),
    correo_electronico: Joi.string().email().required(),
})

//Actividades:
const validationSchemaPartnerActivity = Joi.object({
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
})
const validationSchemaNonPartnerActivity = Joi.object({
    asistencia: Joi.boolean().required(),
    nome_nai: Joi.string().max(30).required(),
    fpp: Joi.string()
        .pattern(/^(\d{2})\/(\d{2})\/(\d{4})$/)
        .required(),
    centro_saude: Joi.string().max(50).required(),
    telefono: Joi.string().min(9).required(),
    correo_electronico: Joi.string().email().required(),
})

//Administradores/as
const validationSchemaLogin = Joi.object({
    correo_electronico: Joi.string().email().required(),
    contrasinal: Joi.string().min(6).required(),
})

//Colaboradores/as:
const validationSchemaNewCollaborator = Joi.object({
    nome: Joi.string().max(15).required(),
    apelidos: Joi.string().max(30).required(),
    descripcion: Joi.string().min(6).max(255).required(),
    rol: Joi.string().max(15),
})

//Exporto las variables:
export {
    validationSchemaNewPartner,
    validationSchemaPartnerActivity,
    validationSchemaNonPartnerActivity,
    validationSchemaLogin,
    validationSchemaNewCollaborator,
}
