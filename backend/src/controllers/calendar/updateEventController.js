import {
    updateEvent,
    getEvent,
    getRowsData,
    updateRow,
    updateCell,
    getCoordinates,
} from '../../googleapis/methods/index.js'
import { filterProperties, formatDate } from '../../utils/index.js'

const updateEventController = async (req, res, next) => {
    try {
        const eventId = req.params.eventId
        const updatedData = req.body
        const sheetId = process.env.SPREADSHEET_ID

        //Cancelar evento:
        if (req.body.status === 'cancelled') {
            //Actualizo el estado en el calendario:
            await updateEvent(eventId, { status: 'cancelled' })

            //Actualizo el estado en la hoja:
            const data = getRowsData(sheetId, 'Actividades', {
                field: 'id',
                value: eventId,
                newValue: '',
                sheetName: 'Actividades',
            })
            const { rows, headers } = data
            const coordinates = getCoordinates(rows, headers, status, 'active')
            const { fieldColumnIndex, valueRowIndex } = coordinates
            await updateCell(
                sheetId,
                'Actividades',
                fieldColumnIndex,
                valueRowIndex,
                'cancelled'
            )
            return res.status(200).json({ message: 'Evento cancelado' })
        }

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
            'status',
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
        //Lo actualizo:
        const response = await updateEvent(eventId, mergedEvent)

        //Actualizo el evento en la hoja de cálculo de Google:
        const fields = {
            field: 'id',
            value: eventId,
            newValue: '',
            sheetName: 'Actividades',
        }
        let rowValuesToUpdate = [
            eventId,
            mergedEvent.summary,
            mergedEvent.description,
            formatDate(mergedEvent.start.dateTime),
            formatDate(mergedEvent.end.dateTime),
            mergedEvent.location,
            mergedEvent.acces,
            mergedEvent.status,
        ]
        const dataToUpdate = await getRowsData(
            sheetId,
            'Actividades',
            fields,
            rowValuesToUpdate
        )
        const { rowToUpdate } = dataToUpdate
        await updateRow(rowToUpdate)

        res.send({
            message: 'Evento actualizado',
            data: response,
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
//     id:"id"
// };
