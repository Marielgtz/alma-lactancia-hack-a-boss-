import { getEvent } from '../../googleapis/methods/index.js'

const getEventController = async (req, res, next) => {
    try {
        const eventId = req.params.eventId
        await getEvent(eventId)
        res.send({ message: 'Evento recuperado del calendario' })
    } catch (error) {
        next(error)
    }
}
export default getEventController
