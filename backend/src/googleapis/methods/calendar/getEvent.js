import { calendar } from '../../client'
import { generateError } from '../../../utils/index.js'

const getEvent = async (eventId, calendarId = 'primary') => {
    try {
        const data = {
            calendarId,
            eventId,
        }
        const response = await calendar.events.get(data)

        console.log('Event details:', response.data)
        return response.data
    } catch (error) {
        console.error('Error getting event:', error)
        generateError(error.message)
    }
}
export default getEvent
