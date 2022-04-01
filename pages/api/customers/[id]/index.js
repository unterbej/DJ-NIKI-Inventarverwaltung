import {
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from "../../../../Helpers/repository";

export default async function handle(req, res) {
  const { query, method, body } = req;
  const customer = body;

  try {
    switch (method) {
      case "GET":
        const resu = await getCustomer(+query.id);
        if (resu) {
          res.status(200).json(resu);
        } else {
          res.status(404).json({ message: "customer not found" });
        }

        break;

      case "PUT":
        customer.id = +query.id;

        const result2 = await updateCustomer(+query.id, customer);
        res.status(200).json(result2);
        break;

      case "DELETE":
        const result = await deleteCustomer(+query.id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "customer not found" });
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
