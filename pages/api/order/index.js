import clientPromise from "../../..//lib/mongodb";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const { method } = req;

  const client = await clientPromise;
  const db = client.db("");
  const cookie = req.cookies.loggedin
  if (method === "GET") {
    try {
      const users = await db.collection("orders").find(
        {costomer_id:cookie}).toArray();
        console.log("cookie : "+cookie);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      // Delete the item with status: 0
      const result = await db.collection("orders").deleteMany({ status: 0 });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: "Item with status: 0 deleted successfully" });
      } else {
        res.status(404).json({ message: "Item with status: 0 not found" });
      }
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
