import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/OrderID.module.css";
// import addOrder from "../../components/hooks/upDateUser"
import { addOrder } from "../../lib/redux/orderSlice";
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
  // console.log(isorder);

  // console.log(chash);
  const orderItems = order?.item?.products;
  // console.log(orderItems)
  const orderstatus = order?.status;

  console.log(orderstatus);
  // const dispatch = useDispatch();
  // const cooke = Cookies.get()
  // console.log(cooke + "cokekekeke")
  // var isDisplayed = false;
  // if (isDisplayed == false) {
  //   if (order && isorder == false) {
  //     setIsorder(true);
  //     isDisplayed = true;
  //     let value:any = Cookies.get("loggedin");
  //     const phoneNumber= value
  //     // addOrder(phoneNumber,{...order})
  //     // dispatch(addOrder({ ...order }));
  //     console.log("adde")
  //     console.log("phone"+phoneNumber )
  //     console.log("order"+{...order})

  //   }
  // }
  //date//
  // Get the current date and time
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

  if (order && orderstatus == 0) {
    console.log("running");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0NzEwNzYsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjgxNTM5NjY3LCJleHAiOjE2ODI0MDM2NjcsIm5iZiI6MTY4MTUzOTY2NywianRpIjoiN1llQktxNFZKZWQxT2FBbiJ9.OUabAxvnci7YD1hiEMqZ8hTRp7w0AtnX6MtuR3y_55g"
    );

    var raw = JSON.stringify({
      order_id: order?._id,
      order_date: formattedDate,
      pickup_location: "test",
      channel_id: "3744780",
      comment: "Reseller: M/s Goku",
      billing_customer_name: order?.customer,
      billing_last_name: "",
      billing_address: order.address?.Address,
      billing_address_2: "",
      billing_city: order.address?.City,
      billing_pincode: order?.address?.pinCode,
      billing_state: order?.address?.State,
      billing_country: "India",
      billing_email: order?.email,
      billing_phone: order?.phone,
      shipping_is_billing: true,
      shipping_customer_name: "",
      shipping_last_name: "",
      shipping_address: "",
      shipping_address_2: "",
      shipping_city: "",
      shipping_pincode: "",
      shipping_country: "",
      shipping_state: "",
      shipping_email: "",
      shipping_phone: "",
      order_items: arrayItem,

      payment_method: "Prepaid",
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: order?.total,
      length: 10,
      breadth: 15,
      height: 20,
      weight: 2.5,
    });

    var requestOptions: any = {
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

  if (orderstatus > 0) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0NzEwNzYsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjgxNTM5NjY3LCJleHAiOjE2ODI0MDM2NjcsIm5iZiI6MTY4MTUzOTY2NywianRpIjoiN1llQktxNFZKZWQxT2FBbiJ9.OUabAxvnci7YD1hiEMqZ8hTRp7w0AtnX6MtuR3y_55g"
    );

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

  // console.log("track : " + tracking)
  //  const track = {tracking}
  if (tracking.length > 10) {
    var trackingObj = JSON.parse(tracking);
    var trackStatus = trackingObj.tracking_data.track_status;
    console.log("track_status:", trackStatus);
  }
  // console.log(trackingObj?.tracking_data)
  // const trackingObj = {
  //   tracking_data: {
  //     track_status: 1,
  //     shipment_status: 42,
  //     shipment_track: [
  //       {
  //         id: 185584215,
  //         awb_code: "1091188857722",
  //         courier_company_id: 10,
  //         shipment_id: 168347943,
  //         order_id: 168807908,
  //         pickup_date: null,
  //         delivered_date: null,
  //         weight: "0.10",
  //         packages: 1,
  //         current_status: "PICKED UP",
  //         delivered_to: "Mumbai",
  //         destination: "Mumbai",
  //         consignee_name: "Musarrat",
  //         origin: "PALWAL",
  //         courier_agent_details: null,
  //         edd: "2021-12-27 23:23:18",
  //       },
  //     ],
  //     shipment_track_activities: [
  //       {
  //         date: "2021-12-23 14:23:18",
  //         status: "X-PPOM",
  //         activity: "In Transit - Shipment picked up",
  //         location: "Palwal_NewColony_D (Haryana)",
  //         "sr-status": "42",
  //       },
  //       {
  //         date: "2021-12-23 14:19:37",
  //         status: "FMPUR-101",
  //         activity: "Manifested - Pickup scheduled",
  //         location: "Palwal_NewColony_D (Haryana)",
  //         "sr-status": "NA",
  //       },
  //       {
  //         date: "2021-12-23 14:19:34",
  //         status: "X-UCI",
  //         activity: "Manifested - Consignment Manifested",
  //         location: "Palwal_NewColony_D (Haryana)",
  //         "sr-status": "5",
  //       },
  //     ],
  //     track_url: "https://shiprocket.co//tracking/1091188857722",
  //     etd: "2021-12-28 10:19:35",
  //   },
  // };
  // console.log(trackingObj.tracking_data.track_status);
const [awbs ,setAwbs] = useState(trackingObj?.tracking_data?.shipment_track?.awb_code)

// setAwbs()

  console.log(tracking.length);
  const handelCancel = () => {
    console.log(order?._id)
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0NzEwNzYsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjgxNTM5NjY3LCJleHAiOjE2ODI0MDM2NjcsIm5iZiI6MTY4MTUzOTY2NywianRpIjoiN1llQktxNFZKZWQxT2FBbiJ9.OUabAxvnci7YD1hiEMqZ8hTRp7w0AtnX6MtuR3y_55g");

var raw = JSON.stringify({
  "ids": [
    order._id
  ]
});

var requestOptions :any = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://apiv2.shiprocket.in/v1/external/orders/cancel", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
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
                {tracking.length == 143 ? <>order Prosessing</> : ""}
                
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
              <div onClick={() => handelCancel()} style={{color:"red"}}>Cancel</div>
              <div className={styles.address}>
                <h3>Delivery</h3>
                <p>Address</p>
                <h2>{order?.customer}</h2>
                <p>
                  {order.address.Address}, {order.address.City} ,
                  {order.address.State}, {order.address.pinCode}
                </p>
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
