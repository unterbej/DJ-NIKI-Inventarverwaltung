import {
  deleteEvent,
  getEvent,
  updateEvent,
} from "../../../../Helpers/repository";

export default async function handle(req, res) {
  const { query, method, body } = req;
  const event = body;

  try {
    switch (method) {
      case "GET":
        const resu = await getEvent(+query.id);
        if (resu) {
          res.status(200).json(resu);
        } else {
          res.status(404).json({ message: "event not found" });
        }

        break;

      case "PUT":
        event.id = +query.id;

        const result2 = await updateEvent(+query.id, event);
        res.status(200).json(result2);
        break;

      case "DELETE":
        const result = await deleteEvent(+query.id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "event not found" });
        }
        break;

      default:
        res.status(500).json({ message: "internal error hehe" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
}
