import { getAllEvents, postEvent } from "../../../Helpers/repository";

export default async function handle(req, res) {
  const { query, method, body } = req;
  const event = body;

  try {
    switch (method) {
      case "GET":
        const result2 = await getAllEvents();
        res.status(200).json(result2);
        break;
      case "POST":
        const newEvent = await postEvent(event);
        res.status(200).json(newEvent);
        break;
      default:
        res.status(500).json({ message: "internal error hehe" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
}
