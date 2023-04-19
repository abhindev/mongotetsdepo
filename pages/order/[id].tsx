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
  const [track_url, setTrack_url] = useState('');
  // const [trackingid,setTrackingID] = useState('');

  const orderItems = order?.item?.products;

  const orderstatus = order?.status;

  console.log(order?.tracking_id)
  
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
  /////////////////////////auth end//////////////
  // console.log(formattedDate)
  
/////////////////////////////track///////////////////////////
if(order && token !== undefined){
  (async () => {
    const data = {
      token: token,
      trackingID: order?.tracking_id,
    }
    const response = await fetch("/api/shiprocket/track",{
      method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
    });
    const jsonData = await response.json();
    
    const trackData = (JSON.parse(jsonData));
   const url = (trackData?.tracking_data?.track_url)
    setTrack_url(url)
  })();
}
console.log("track: "+track_url)
  

  // setAwbs()

  // console.log(tracking.length);
  const handelCancel = () => {
    // console.log(order?._id);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${token}`
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

                {/* <div>
                  {trackingObj?.tracking_data?.shipment_track_activities?.map(
                    (item: any, i: number) => (
                      <div>
                        <h6>{item?.activity}</h6>
                        <p>{item.location}</p>
                      </div>
                    )
                  )}
                </div> */}
                {/* <a href={trackingObj?.tracking_data?.track_url}>
                  {trackingObj?.tracking_data?.track_url}
                </a> */}
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
