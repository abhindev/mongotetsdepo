import { MongoClient, ObjectId } from "mongodb";
import { useState } from "react";

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
  error: any;
}

const Order = ({ order, error }: OrderProps) => {
  console.log(order);
  const [isorder,setIsorder] = useState(false)
  // console.log(chash);
  

  var isDisplayed = false;
  if (isDisplayed == false) {
    if(order &&  isorder==false ){
      setIsorder(true)
      isDisplayed=true
    }
  }
  return (
    <div>
      {
        isorder!==true ? <h1>error</h1> : <h1>no</h1>
      }
    </div>
  );
};

interface Params {
  id: string;
}

export default Order;

export const getServerSideProps = async ({ params }: { params: Params }) => {
  try {
    const resone = await fetch(
      `${process.env.DOM}/api/order/chashfree/${params.id}`
    );
    const chash = await resone.json();
    const orderStatus = chash.data.order_status;
    console.log(orderStatus);

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MongoDB connection string is missing.");
    }
    const client = await MongoClient.connect(uri);
    const db = client.db("kalianiammas");

    if (orderStatus == "PAID") {
      const orders = await db
        .collection("orders")
        .findOne({ _id: new ObjectId(params.id) });
      const order = JSON.parse(JSON.stringify(orders));
      const status = order.status;
      if (status < 1) {
        console.log("true");
        // Update the order with method: 1
        const updatedOrder = await db
          .collection("orders")
          .updateOne({ _id: new ObjectId(params.id) }, { $set: { status: 1 } });
      }
      return {
        props: {
          order: order,
        },
      };
    } else {
      const deletOrder = await db
        .collection("orders")
        .deleteOne({ _id: new ObjectId(params.id) });
      return {
        props: {
          error: "ERROR",
        },
      };
    }
  } catch (err: any) {
    console.log(err);
  }
};
