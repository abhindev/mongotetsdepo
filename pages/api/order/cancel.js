import clientPromise from "../../../lib/mongodb";
import Order from "../../../models/Order";
const { ObjectId } = require("mongodb"); 

const handler = async (req, res) => {
  const {
    method,
  } = req;
// const newid = Number(id)
  const client = await clientPromise;
  const db = client.db();

  if (method === "PUT") {
    console.log(req.body)
    const newid = Number(req.body.id)
    console.log("id:" + newid +", type"+ typeof(newid) )
    try {
      const order = await db
        .collection("orders")
        .updateOne({ _id: newid }, { $set: { cancel: req.body.cancel } })
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
};

export default handler;
