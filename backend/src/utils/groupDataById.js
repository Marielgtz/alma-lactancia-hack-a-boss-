const groupDataById = (data) => {
    const groupedData = {}

    data.forEach((row) => {
        const [formId, formName, label, type] = row
        if (!groupedData[formId]) {
            groupedData[formId] = {
                formName,
                fields: [],
            }
        }
        groupedData[formId].fields.push({ label, type })
    })

    return groupedData
}
export default groupDataById
