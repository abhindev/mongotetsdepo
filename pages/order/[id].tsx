import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import { useState,useEffect } from "react";
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
    // console.log(chash);
    const orderStatus = chash.data.order_status;

    // console.log("order.id try ssp");
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
        // console.log("ststus<1");
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
  const [tracking, setTracking] = useState('');
  const [token, setToken] = useState();
  const [trackingid,setTrackingID] = useState('');

  const orderItems = order?.item?.products;

  const orderstatus = order?.status;
  
  //////////////////////////////////////auuth///////////////////
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/shiprocket");
      const jsonData = await response.json();
      setToken(jsonData);
    };

    if (token === undefined) {
      fetchData();
    }
  }, [token]); // Only run the effect when token changes

  // console.log("token: " + token);
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
  // console.log(orderstatus);
  // console.log(formattedDate)
  

  // create order shiprocket////////////////////////////////
  const addOrder = async () => {
    const data = {
      token: token,
      order_id: order._id,
      order_date: formattedDate,
      billing_customer_name: order.customer,
      billing_address: order.address.Address,    
      billing_city: order.address.City,
      billing_pincode: order.address.pinCode,
      billing_state: order.address.State,
      billing_email: order.email,
      billing_phone: order.phone,
      order_items: arrayItem,
      sub_total: order.total,
    };
  
    const response = await fetch('/api/shiprocket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const jsonData = await response.json();
      const data = JSON.parse(jsonData);
      const orderId = data.order_id;
      // console.log(data)
      // console.log(orderId)
      setTrackingID(orderId)
    } else {
      console.error('Failed to add order:', response.statusText);
    }
  };
  
  if (order && token !== undefined) {
    addOrder();
  }
  //////////////////////////////////////////////////////////
  // const orderId = trackingid
////////////////////////////////////////////////////////////
const putOrderId = async () => {
  console.log("running")
  const response = await fetch(`/api/order/${order._id}`, {
    method: 'PUT',
    // headers: {
    //   'Content-Type': 'application/json', 
    //   'Authorization': `Bearer ${token}`,
    // },
    body: JSON.stringify(trackingid),
  });
}


const ordertrackId = order?.tracking_id;

if(!ordertrackId){putOrderId()}
/////////////////////////////track///////////////////////////
if(order && token !== undefined){
  (async () => {
    const data = {
      token: token,
      trackingID: 336283221,
    }
    const response = await fetch("/api/shiprocket/track",{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    // console.log(jsonData);
  })();
}
////////////////////////////track-END//////////////////////////
  // if ( token !== undefined && orderstatus > 0) {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Authorization", `Bearer ${token}`);

  //   var requestOptions: any = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(
  //     `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${order?._id}`,
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => setTracking(result))
  //     .catch((error) => console.log("error", error));
  // }

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
