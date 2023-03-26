import { MongoClient, ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return res.status(500).json({ message: 'MongoDB connection string is missing.' });
  }

  const client = await MongoClient.connect(uri);
  const db = client.db('kalianiammas');
  // Your code to update the document goes here
  const orderId = new ObjectId('123456789012'); // replace with the ID of the order you want to update
const newCustomerName = 'hoooo';

await db.collection('orders').updateOne(
  { _id: orderId },
  { $set: { customer: newCustomerName } }
);

console.log('Order updated successfully!');
  client.close();
}
