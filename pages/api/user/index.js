import clientPromise from "../../..//lib/mongodb";

const handler = async (req, res) => {
  const { method } = req;

  const client = await clientPromise;
  const db = client.db();

  if (method === "GET") {
    try {
      const users = await db.collection("users").find().toArray();
      res.status(200).json(users, insertedId);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const userData = await db.collection("users").find({ "phoneNumber": req.body.phoneNumber }).toArray();
      console.log(userData)
      if(userData.length ==0 ){
      const user = await db.collection("users").insertOne(req.body);
      res.status(201).json(user);
      console.log("user addad");
    } else {
        console.log("user is already added")
    }
    } catch (err) {
      res.status(500).json(err);
    }
  } if (method === "PUT") {
    try {
      const order = await db.collection("users").updateOne(
        { "phoneNumber": req.body.phoneNumber },
        {
          $push: {
            "order": req.body.newFieldValue // Specify the new field and its value here
          }
        }
      );
      res.status(201).json(order);
      console.log(`Successfully updated ${result.modifiedCount} document(s)`);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
};

export default handler;
