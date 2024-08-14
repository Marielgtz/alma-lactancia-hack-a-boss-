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
const eventSchema = Joi.object({
    summary: Joi.string().max(30).required(),
    description: Joi.string().max(255).optional(),
    start: Joi.object({
        dateTime: Joi.date().iso().required(),
        timeZone: Joi.string().optional(),
    }).required(),
    end: Joi.object({
        dateTime: Joi.date().iso().required(),
        timeZone: Joi.string().optional(),
    }).required(),
    location: Joi.string().optional(),
    attendees: Joi.array()
        .items(
            Joi.object({
                email: Joi.string().email().required(),
            })
        )
        .optional(),
    reminders: Joi.object({
        useDefault: Joi.boolean().optional(),
        overrides: Joi.array()
            .items(
                Joi.object({
                    method: Joi.string().valid('email', 'popup').required(),
                    minutes: Joi.number().integer().positive().required(),
                })
            )
            .optional(),
    }).optional(),
    visibility: Joi.string().valid('default', 'public', 'private').optional(),
    access: Joi.string().valid('partners', 'free').required(),
}).custom((value, helpers) => {
    const startDateTime = new Date(value.start.dateTime)
    const endDateTime = new Date(value.end.dateTime)

    if (endDateTime <= startDateTime) {
        return helpers.message('End date must be after start date')
    }

    return value
}, 'End Date Validation')

//Unirse a las actividades:
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
const validationSchemaJoinNonPartnerActivity = Joi.object({
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

//Mensajes:
const validationSchemaNewMessage = Joi.object({
    name: Joi.string().max(15).required(),
    surname: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().max(30),
    comments: Joi.string().max(255),
})
//Colaboradores/as:
const validationSchemaNewCollaborator = Joi.object({
    name: Joi.string().max(15).required(),
    surname: Joi.string().max(30).required(),
    description: Joi.string().min(6).max(255).required(),
    role: Joi.string().max(15),
    team: Joi.alternatives().try(Joi.boolean(), Joi.string()).required(),
})

//Exporto las variables:
export {
    validationSchemaNewPartner,
    validationSchemaPartnerActivity,
    validationSchemaJoinNonPartnerActivity,
    validationSchemaLogin,
    validationSchemaNewCollaborator,
    validationSchemaNewMessage,
    eventSchema,
}
