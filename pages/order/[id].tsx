import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/OrderID.module.css";
// import addOrder from "../../components/hooks/upDateUser"
// import { addOrder } from "../../lib/redux/orderSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
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

export const getServerSideProps = async ({ params }: { params: Params }) => {
  try {
    const resone = await fetch(
      `https://mongotetsdepo.vercel.app/api/order/chashfree/${params.id}`
    );
    const chash = await resone.json();
    console.log(chash);
    const orderStatus = chash.data.order_status;

    console.log("order.id try ssp");
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MongoDB connection string is missing.");
    }
    const client = await MongoClient.connect(uri);
    const db = client.db("kalianiammas");

    if (orderStatus == "PAID") {
      console.log("order status PAID");
      const orders = await db
        .collection("orders")
        .findOne({ _id: new ObjectId(params.id) });
      const order = JSON.parse(JSON.stringify(orders));
      const status = order.status;
      if (status < 1) {
        console.log("ststus<1");
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
      console.log("ststus !1");
      const deletOrder = await db
        .collection("orders")
        .deleteOne({ _id: new ObjectId(params.id) });
      return {
        props: {
          order: "ERROR",
        },
      };
    }
  } catch (err: any) {
    console.log(err);
    // Return an error object with the order prop set to "ERROR"
    return {
      props: {
        order: "ERROR",
      },
    };
  }
};

const Order = ({ order }: any, error: OrderProps) => {
  const [isorder, setIsorder] = useState(order);
  const [tracking, setTracking] = useState("");
  const [token, setToken] = useState();

  const orderItems = order?.item?.products;

  const orderstatus = order?.status;
  //////////////////////get ships//////////
  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${token}`);

  // var requestOptions: any = {
  //   method: "GET",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };

  // fetch(
  //   "https://apiv2.shiprocket.in/v1/external/orders/show/335383658",
  //   requestOptions
  // )
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
  ////////////////////////////////////////////////////////////

  
  //////////////////////////////////////auuth///////////////////
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    email: "vihara.lifecare@gmail.com",
    password: "POP1@spiderman!",
  });
  
  var requestOptions:any = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch("https://apiv2.shiprocket.in/v1/external/auth/login", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  /////////////////////////auth end///////////////////////
  var currentDate = new Date();

  // Extract the components of the date and time
  var year = currentDate.getFullYear();
  var month = String(currentDate.getMonth() + 1).padStart(2, "0");
  var day = String(currentDate.getDate()).padStart(2, "0");
  var hours = String(currentDate.getHours()).padStart(2, "0");
  var minutes = String(currentDate.getMinutes()).padStart(2, "0");

  // Format the date and time string
  var formattedDate =
    year + "-" + month + "-" + day + " " + hours + ":" + minutes;

  // console.log(formattedDate); // Example output: "2023-04-15 13:45"
  ////////////////////////////////////////////
  const item = order?.item?.products;
  const arrayItem: any = [];
  item?.map((item: any, i: number) => {
    arrayItem.push({
      name: item?.title,
      sku: item?._id + i,
      units: item?.quantity,
      selling_price: item.price,
      discount: "",
      tax: "",
      hsn: 441122,
    });
  });
  // console.log(order);

  // const value = arrayItem;
  // console.log(value + " : " + typeof value);
  console.log("order states: " + orderstatus);
  console.log("order :" + order);
  // create shiprocket

  if (order && orderstatus == 0) {
    console.log("running")
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify(
    {
      "order_id": "2242343545447",
      "order_date": "2023-04-16 11:11",
      "pickup_location": "Vihara",
      "channel_id": "3740095",
      "comment": "Reseller: M/s Goku",
      "billing_customer_name": "appu",
      "billing_last_name": "Uzumaki",
      "billing_address": "House 221B, Leaf Village",
      "billing_address_2": "Near Hokage House",
      "billing_city": "New Delhi",
      "billing_pincode": "110002",
      "billing_state": "Delhi",
      "billing_country": "India",
      "billing_email": "naruto@uzumaki.com",
      "billing_phone": "9876543210",
      "shipping_is_billing": true,
      "shipping_customer_name": "",
      "shipping_last_name": "",
      "shipping_address": "",
      "shipping_address_2": "",
      "shipping_city": "",
      "shipping_pincode": "",
      "shipping_country": "",
      "shipping_state": "",
      "shipping_email": "",
      "shipping_phone": "",
      "order_items": [
        {
          "name": "Kunai",
          "sku": "chakra123",
          "units": 10,
          "selling_price": "900",
          "discount": "",
          "tax": "",
          "hsn": 441122
        }
      ],
      "payment_method": "Prepaid",
      "shipping_charges": 0,
      "giftwrap_charges": 0,
      "transaction_charges": 0,
      "total_discount": 0,
      "sub_total": 9000,
      "length": 10,
      "breadth": 15,
      "height": 20,
      "weight": 2.5
    }
    
  );

  var requestOptions:any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  }
  /// shiprocket end
  if (orderstatus > 0) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions: any = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${order?._id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setTracking(result))
      .catch((error) => console.log("error", error));
  }

  // console.log("track : " + tracking);
  //  const track = {tracking}
  if (tracking.length > 10) {
    var trackingObj = JSON.parse(tracking);
    var trackStatus = trackingObj?.tracking_data?.track_status;
    // console.log("track_status:", trackStatus);
  }

  const [awbs, setAwbs] = useState(
    trackingObj?.tracking_data?.shipment_track?.awb_code
  );

  // setAwbs()

  // console.log(tracking.length);
  const handelCancel = () => {
    // console.log(order?._id);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0NzEwNzYsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjgxNTM5NjY3LCJleHAiOjE2ODI0MDM2NjcsIm5iZiI6MTY4MTUzOTY2NywianRpIjoiN1llQktxNFZKZWQxT2FBbiJ9.OUabAxvnci7YD1hiEMqZ8hTRp7w0AtnX6MtuR3y_55g"
    );

    var raw = JSON.stringify({
      ids: [order._id],
    });

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://apiv2.shiprocket.in/v1/external/orders/cancel",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      {isorder == "ERROR" ? (
        <div className={styles.error}>
          <Image src={"/img/error.gif"} alt="" height={200} width={250} />
        </div>
      ) : (
        <>
          <div className={styles.container}>
            <div>
              <div className={styles.orderId}>
                <h3 className={styles.id}>Order ID: {order._id}</h3>
              </div>
              <div style={{ borderTop: "1px solid gray", marginTop: "10px" }}>
                {orderItems?.map((item: any, i: any) => (
                  <div key={i} className={styles.item}>
                    <div className={styles.imgdiv}>
                      <Image src={item.img[0]} alt="" width="80" height="80" />
                    </div>
                    <div className={styles.more}>
                      <div className={styles.desc}>
                        <h1>{item.title}</h1>
                        <p>{item.variant}</p>
                      </div>
                      <div className={styles.price}>
                        <p>₹{item.price}</p>
                        <p>Qty:{item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.order_track}>
                {tracking.length < 143 ? <>order Prosessing</> : ""}

                <div>
                  {trackingObj?.tracking_data?.shipment_track_activities?.map(
                    (item: any, i: number) => (
                      <div>
                        <h6>{item?.activity}</h6>
                        <p>{item.location}</p>
                      </div>
                    )
                  )}
                </div>
                <a href={trackingObj?.tracking_data?.track_url}>
                  {trackingObj?.tracking_data?.track_url}
                </a>
              </div>

              <div className={styles.address}>
                <h3>Delivery</h3>
                <p>Address</p>
                <h2>{order?.customer}</h2>
                <p>
                  {order.address.Address}, {order.address.City} ,
                  {order.address.State}, {order.address.pinCode}
                </p>
              </div>
              <div onClick={() => handelCancel()} style={{ color: "red" }}>
                Cancel
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface Params {
  id: string;
}

export default Order;
