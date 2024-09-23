import {
    updateEvent,
    getRowsData,
    updateCell,
    getCoordinates,
    getEvent,
    allSheetData,
} from '../../googleapis/methods/index.js'

const cancelEvent = async (req, res, next) => {
    try {
        const eventId = req.params.eventId
        const sheetId = process.env.SPREADSHEET_ID

        // Actualizo el estado en el calendario:
        const eventFronCalendar = await getEvent(eventId)
        await updateEvent(eventId, {
            ...eventFronCalendar,
            status: 'cancelled',
        })

        //Actualizo el estado en la hoja:
        const data = await allSheetData(sheetId, 'Actividades')
        const { rows, headers } = data

        const coordinates = getCoordinates(rows, headers, 'status', 'confirmed')
        const { fieldColumnIndex, valueRowIndex } = coordinates
        await updateCell(
            sheetId,
            'Actividades',
            fieldColumnIndex,
            valueRowIndex,
            'cancelled'
        )
        return res.status(200).json({ message: 'Evento cancelado' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export default cancelEvent
