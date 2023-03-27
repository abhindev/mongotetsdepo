import { MongoClient, ObjectId } from "mongodb";

interface OrderProps {
  order:
    | {
        _id: string;
        customer: string;
        method: number;
        item: any;
        status: number;
      }
    | any;
  chash: any;
}

const Order = ({ order }: OrderProps) => {
  console.log(order);
  // console.log(chash);

  return (
    <div>
      <h1>hay</h1>
      {/* <h1>{order._id}</h1> */}
    </div>
  );
};

interface Params {
  id: string;
}

export const getServerSideProps = async ({ params }: { params: Params }) => {
  
    const resone = await fetch(
      `${process.env.DOM}/api/order/chashfree/${params.id}`
    );
    const chash = await resone.json();
    const orderStatus = chash.data.order_status;
      console.log(orderStatus);

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB connection string is missing.');
    }
    const client = await MongoClient.connect(uri);
    const db = client.db('kalianiammas');
    
    if(orderStatus=="PAID"){
      const orders = await db
      .collection('orders')
      .findOne({ _id: new ObjectId(params.id) });
      const order = JSON.parse(JSON.stringify(orders))
      const status = (order.status);
      if (status < 1 ){
        console.log("true")
        // Update the order with method: 1
        const updatedOrder = await db.collection('orders').updateOne(
          { _id: new ObjectId(params.id) },
          { $set: { status: 1 } }
        );
      }
      return {
        props: {
          order: order,
        },
      };
    } else {
      const deletOrder = await db.collection('orders').deleteOne(
      { _id: new ObjectId(params.id) })
    }
};

export default Order;



// console.log(updatedOrder);
//get chashfree
// const resone = await fetch(`http://localhost:3000/api/order/chashfree/${params.id}`);
// const chash = await resone.json();
// const orderStatus =(chash.data.order_status)

// if(orderStatus=="PAID" && status == 0 ){
//   const updatedOrder = await db.collection('orders').updateOne(
//     { _id: new ObjectId(params.id) },
//     { $set: { status: 1 } }
//   );
// }if(orderStatus == "ACTIVE" && status == 0){
//   const deletOrder = await db.collection('orders').deleteOne(
//     { _id: new ObjectId(params.id) },
//   );
// }

// console.log(params.id)
