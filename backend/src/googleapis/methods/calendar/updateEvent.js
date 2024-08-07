import { calendar } from '../../client.js'
import { generateError } from '../../../utils/index.js'

const updateEvent = async (eventId, eventDetails, calendarId = 'primary') => {
    try {
        const data = {
            calendarId,
            eventId,
            resource: eventDetails,
        }
        const response = await calendar.events.update(data)

        console.log('Event updated:', response.data)
        return response.data
    } catch (error) {
        console.error('Error updating event:', error)
        generateError(error.message)
    }
}
export default updateEvent
