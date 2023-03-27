
export default async function handler(req, res) {
    // const data = req.body;
    const response = await fetch(process.env.CASHFREE_URL, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-01-01",
          "x-client-id": process.env.CASHFREE_CLIENT_ID,
          "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
      },
    })
  
    const responseData = await response.json();
     // Send response back to frontend
     res.status(response.status).json(responseData)
  
      // .then((response) => response.json())
      // .then((data) => {
      //   console.log("cashfree-Success:",data);
      //   // console.log(data)
      // })
      // .catch((error) => {
      //   console.error("Error:", error);
      // });
  
  
  }
///////////////////////////////////////////////////

// import clientPromise from "../../..//lib/mongodb";
// import Order from "../../../models/Order";

// const handler = async (req, res) => {
//   const { method } = req;

//   const client = await clientPromise;
//   const db = client.db();
//   if (method === "POST") {
//     try {
//       const order = await db.collection("orders").insertOne(req.body);
//       res.status(201).json(order);
//       console.log(order.insertedId);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   }
// };

// export default handler;


