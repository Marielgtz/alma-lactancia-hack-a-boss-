const deleteCollaborator = (_req, res, next) => {
    try {
        res.send({})
    } catch (error) {
        next(error)
    }
}
export default deleteCollaborator
