import { MongoClient, ObjectId } from 'mongodb';

interface OrderProps {
  order: {
    _id: string;
    customer: string;
    method: number;
  } | null;
}

const Order = ({ order }: OrderProps) => {
  console.log(order?.method);
  return (
    <>
      <h1>{order?._id}</h1>
      <h1>{order?.customer}</h1>
    </>
  );
};

interface Params {
  id: string;
}

export const getServerSideProps = async ({ params }: { params: Params }) => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('MongoDB connection string is missing.');
    }

    const client = await MongoClient.connect(uri);
    const db = client.db('kalianiammas');

    // Find the order to be updated
    const order = await db.collection('orders').findOne({ _id: new ObjectId(params.id) });
        console.log(order);
    // Update the order with method: 1
    const updatedOrder = await db.collection('orders').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { method: 6 } }
    );

    console.log(updatedOrder);

    return {
      props: {
        order: JSON.parse(JSON.stringify(order)),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        order: null,
      },
    };
  }
};

export default Order;
