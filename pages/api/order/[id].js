import clientPromise from "../../../lib/mongodb";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  const client = await clientPromise;
  const db = client.db();

  if (method === "GET") {
    try {
      const order = await db.collection("orders").findOne({ _id: id });
      if (!order) {
        res.status(404).json({ message: "Order not found" });
      } else {
        res.status(200).json(order);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  if (method === "PUT") {
    try {
      const order = await db
        .collection("orders")
        .findOneAndUpdate({ _id: id }, { $set: req.body }, { returnOriginal: false });
      res.status(200).json(order.value);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
  }
};

export default handler;
