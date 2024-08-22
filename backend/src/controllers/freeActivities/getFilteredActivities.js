import { generateError } from '../../utils/index.js'
import { getValues } from '../../googleapis/methods/index.js'

const getFilteredActivities = async (req, res, next) => {
    try {
        const {
            id,
            summary,
            description,
            exactDate,
            dateFrom,
            dateUntil,
            location,
            access,
        } = req.body

        const sheetId = process.env.SPREADSHEET_ID
        const response = await getValues(sheetId, 'Actividades')
        const { allSheetData } = response

        const rows = allSheetData.data.values

        if (!rows || rows.length === 0) {
            generateError('No se encontraron actividades.')
        }

        const activities = rows.slice(1).map((row) => ({
            id: row[0],
            summary: row[1],
            description: row[2],
            start: row[3],
            end: row[4],
            location: row[5],
            access: row[6],
        }))

        // Filtrar las actividades según los parámetros
        const filteredActivities = activities.filter((activity) => {
            const nameMatches =
                !summary ||
                activity.summary.toLowerCase().includes(summary.toLowerCase())

            const idMatches =
                !id || activity.id.toLowerCase().includes(id.toLowerCase())

            const accessMatches =
                !access ||
                activity.access.toLowerCase().includes(access.toLowerCase())

            const descriptionMatches =
                !description ||
                activity.description
                    .toLowerCase()
                    .includes(description.toLowerCase())

            const locationMatches =
                !location ||
                activity.location.toLowerCase().includes(location.toLowerCase())

            const startDateMatches =
                !dateFrom || new Date(activity.start) >= new Date(dateFrom)

            const endDateMatches =
                !dateUntil || new Date(activity.end) <= new Date(dateUntil)

            // Si se proporciona una fecha específica pero no hay un rango definido, se filtra por la fecha exacta
            const dateMatches =
                exactDate && !dateFrom && !dateUntil
                    ? activity.start === start
                    : true

            // Retorno solo las actividades que coincidan con todos los filtros aplicables
            return (
                nameMatches &&
                dateMatches &&
                startDateMatches &&
                endDateMatches &&
                idMatches &&
                descriptionMatches &&
                locationMatches &&
                accessMatches
            )
        })

        res.json({
            message: 'Datos filtrados obtenidos',
            data: filteredActivities,
        })
    } catch (error) {
        next(error)
    }
}

export default getFilteredActivities
