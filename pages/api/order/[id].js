import clientPromise from "../../../lib/mongodb";
import Order from "../../../models/Order";
const { ObjectId } = require("mongodb"); 

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;
const newid = Number(id)
  const client = await clientPromise;
  const db = client.db();
  if (method === "GET") {
    try {
      const order = await db.collection("orders").findOne({ _id: newid });
      
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

    console.log("id:" + newid +", type"+ typeof(newid) )
    try {
      const order = await db
        .collection("orders")
        .updateOne({ _id: newid }, { $set: { tracking_id: req.body } })
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
