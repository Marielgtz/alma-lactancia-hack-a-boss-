import { deleteEvent } from "../../googleapis/methods/index.js";

const deleteEventController = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    await deleteEvent(eventId);
    res.send({ message: "Evento eliminado del calendario" });
  } catch (error) {
    next(error);
  }
};
export default deleteEventController;
