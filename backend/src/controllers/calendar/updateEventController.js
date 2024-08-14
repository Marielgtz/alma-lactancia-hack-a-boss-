import { updateEvent, getEvent } from '../../googleapis/methods/index.js'
import { filterProperties } from '../../utils/index.js'

const updateEventController = async (req, res, next) => {
    try {
        const eventId = req.params.eventId
        const updatedData = req.body

        //Traigo el evento del calendario:
        const existingEvent = await getEvent(eventId)
        const allowedProperties = [
            'summary',
            'location',
            'description',
            'start',
            'end',
            'location',
            'attendees',
            'reminders',
            'visibility',
            'access',
        ]

        //Creo un objeto solo con las propiedades que admite el método update de calendar:
        const filteredExistingEvent = filterProperties(
            existingEvent,
            allowedProperties
        )
        const filteredUpdatedData = filterProperties(
            updatedData,
            allowedProperties
        )

        const mergedEvent = {
            ...filteredExistingEvent,
            ...filteredUpdatedData,
            start: {
                ...filteredExistingEvent.start,
                ...filteredUpdatedData.start,
            },
            end: {
                ...filteredExistingEvent.end,
                ...filteredUpdatedData.end,
            },
        }

        const response = await updateEvent(eventId, mergedEvent)
        res.send({
            message: 'Evento actualizado en el calendario',
            response: response,
        })
    } catch (error) {
        next(error)
    }
}
export default updateEventController

//Ejemplo del objeto necesario

//{
//     summary:
//     description:
//     start: {
//         dateTime: "2024-08-09T10:00:00+02:00",
//         timeZone: "Europe/Madrid"
//     },
//     end: {
//         dateTime: "2024-08-09T12:00:00+02:00",
//         timeZone: "Europe/Madrid"
//     },
//     location: "123 de Michelena, Pontevedra, ES",
//     attendees: [  // Lista de asistentes
//         { email: "fulano@example.com" },
//         { email: "mengano@example.com" }
//     ],
//     reminders: {
//         useDefault: false,
//         overrides: [
//             { method: "email", minutes: 1440 },
//             { method: "popup", minutes: 10 }  /
//         ]
//     },
//     visibility: "private",
//     access: "partners"
// };
