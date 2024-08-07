import { calendar } from '../../client.js'
import { generateError } from '../../../utils/index.js'

const deleteEvent = async (eventId, calendarId = 'primary') => {
    try {
        const data = {
            calendarId,
            eventId,
        }
        await calendar.events.delete(data)

        console.log('Event deleted:', eventId)
    } catch (error) {
        console.error('Error deleting event:', error)
        generateError(error.message)
    }
}
export default deleteEvent
