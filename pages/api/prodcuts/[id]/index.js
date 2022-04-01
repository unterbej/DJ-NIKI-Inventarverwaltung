import {
  deleteProduct,
  getProduct,
  updateProduct,
} from "../../../../Helpers/repository";

export default async function handle(req, res) {
  const { query, method, body } = req;
  const product = body;

  try {
    switch (method) {
      case "GET":
        const resu = await getProduct(+query.id);
        if (resu) {
          res.status(200).json(resu);
        } else {
          res.status(404).json({ message: "product not found" });
        }

        break;

      case "PUT":
        product.id = +query.id;

        const result2 = await updateProduct(+query.id, product);
        res.status(200).json(result2);
        break;

      case "DELETE":
        const result = await deleteProduct(+query.id);
        if (result) {
          res.status(200).json(result);
        } else {
          res.status(404).json({ message: "product not found" });
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
