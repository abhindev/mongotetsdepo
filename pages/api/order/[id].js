import clientPromise from "../../../lib/mongodb";
import Order from "../../../models/Order";
const { ObjectId } = require("mongodb"); 

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  const client = await clientPromise;
  const db = client.db();
  if (method === "GET") {
    try {
      const order = await db.collection("orders").findOne({ _id: new ObjectId(id) });
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      return res.status(200).json(order);
    } catch (err) {
      console.error("Error fetching order:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (method === "PUT") {
    console.log(req.body)
    try {
      const order = await db
        .collection("orders")
        .updateOne({ _id: new ObjectId(id) }, { $set: { tracking_id: req.body } })
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    
  }
};

export default handler;
