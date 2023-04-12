import clientPromise from "../../..//lib/mongodb";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;

  const client = await clientPromise;
  const db = client.db("");

  if (method === "GET") {
    try {
      const users = await db.collection("users").find({ "phoneNumber": "+916235354432" }).toArray();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
  if (method === "POST") {
    try {
      const order = await db.collection("orders").insertOne(req.body);
      res.status(201).json(order);
      // console.log(order.insertedId);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

export default handler;
