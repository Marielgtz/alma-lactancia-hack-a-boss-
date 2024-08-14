import { listEvents } from "../../googleapis/methods/index.js";

const listEventsController = async (req, res, next) => {
  try {
    const eventData = req.body;
    const response = await listEvents(eventData);
    res.send({
      message: "Eventos obtenidos del calendario",
      response: response,
    });
  } catch (error) {
    next(error);
  }
};
export default listEventsController;
