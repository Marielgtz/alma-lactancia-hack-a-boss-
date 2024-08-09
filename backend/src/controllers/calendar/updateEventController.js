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
            'attendees',
            'reminders',
            'recurrence',
            'colorId',
            'visibility',
            'conferenceData',
            'attachments',
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
