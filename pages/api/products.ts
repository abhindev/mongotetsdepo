import clientPromise from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    // Data: WithId<Document>[]
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse
    ) => {
    try {
      const client = await clientPromise;
      const db = client.db("products");
      
      const Data = await db.collection("products").find({}).toArray();
      res.json(Data);
    } catch (e:any) {
      console.error(e);
      throw new Error(e).message;
    }
  };