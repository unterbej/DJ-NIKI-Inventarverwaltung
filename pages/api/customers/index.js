import { getAllCustomers, postCustomer } from "../../../Helpers/repository";

export default async function handle(req, res) {
  const { query, method, body } = req;
  const customer = body;

  try {
    switch (method) {
      case "GET":
        const result2 = await getAllCustomers();
        res.status(200).json(result2);
        break;
      case "POST":
        const newCustomer = await postCustomer(customer);
        res.status(200).json(newCustomer);
        break;
      default:
        res.status(500).json({ message: "internal error hehe" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
}
