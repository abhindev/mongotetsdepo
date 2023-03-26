import clientPromise from "../../lib/mongodb";
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

type Product = {
  name: string;
  description: string;
  price: number;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  const client = await clientPromise;
  const db = client.db("products");

  switch (method) {
    case 'GET':
      try {
        const data = await db.collection("products").find().toArray();
        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    case 'POST':
      try {
        const product: Product = body;
        const result = await db.collection("products").insertOne(product);
        res.status(201).json({ message: "Product created successfully", id: result.insertedId });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
};
