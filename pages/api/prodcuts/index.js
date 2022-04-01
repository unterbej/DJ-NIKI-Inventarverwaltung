import {
  getAllCustomers,
  getAllEvents,
  getAllProducts,
  postCustomer,
  postProduct,
} from "../../../Helpers/repository";

export default async function handle(req, res) {
  const { query, method, body } = req;
  const customer = body;

  try {
    switch (method) {
      case "GET":
        const result2 = await getAllProducts();
        res.status(200).json(result2);
        break;
      case "POST":
        const events = await getAllEvents();
        let bool = false;
        events.forEach((r) => {
          if (r.ID == customer.EventID) {
            bool = true;
          }
        });
        if (bool) {
          const newCustomer = await postProduct(customer);
          res.status(200).json(newCustomer);
        } else {
          res.status(500).json({
            message: "event doesn't exist",
          });
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
