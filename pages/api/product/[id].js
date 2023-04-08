import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {

  const {
    method,
    query: { id },
    body,
  } = req;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return res.status(500).json({ message: 'MongoDB connection string is missing.' });
  }

  const client = await MongoClient.connect(uri);
  const db = client.db('kalianiammas');

  // Your code to update the document goes here
  const orderId = new ObjectId(id); // replace with the ID of the order you want to update
  const newCustomerName = body;

  await db.collection('products').updateOne(
    { _id: orderId },
    { $push: { reviews: newCustomerName } }
  );

  console.log('Order updated successfully!');
  client.close();

  return res.status(200).json({ message: 'Order updated successfully!' });
}
