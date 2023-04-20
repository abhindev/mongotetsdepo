import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../../../styles/OrderID.module.css";
// import addOrder from "../../components/hooks/upDateUser"
// import { addOrder } from "../../lib/redux/orderSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
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

    // console.log("chash" + chash);

    //get db order
    const orders = await db
      .collection("orders")
      .findOne({ _id: new ObjectId(params.id) });
    const order = JSON.parse(JSON.stringify(orders));
    const status = order.status;
    const method = order.method;

    console.log("isorder" + method);
    console.log("cash" + orderStatus);
    //end
    if (method == 0) {
      if (orderStatus == "PAID") {
        const status = order.status;
        console.log("status update PAID");
        if (status < 1) {
          console.log("status update ");
          const updatedOrder = await db
            .collection("orders")
            .updateOne(
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
        console.log("DELET");
        const deletOrder = await db
          .collection("orders")
          .deleteOne({ _id: new ObjectId(params.id) });
        return {
          props: {
            order: "ERROR",
          },
        };
      }
    } else if (method == 1) {
      console.log("status update COD");
      if (status < 1) {
        console.log("status update");
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
      console.log("DELET FINAL");
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
  const [trackingid, setTrackingID] = useState("");
  const router = useRouter();
  const orderItems = order?.item?.products;

  const orderstatus = order?.status;
  console.log(orderstatus)
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
    const stat = (orderstatus== 0? "Prepaid": "COD")
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
      payment_method : stat,
    };
console.log(stat)
    const response = await fetch("/api/shiprocket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const jsonData = await response.json();
      const data = JSON.parse(jsonData);
      const orderId = data.order_id;
      // console.log(data)
      console.log(orderId);
      setTrackingID(orderId);
    } else {
      console.error("Failed to add order:", response.statusText);
    }
  };

  if (order !== "ERROR" && token !== undefined) {
    console.log("adding order");
    addOrder();
  }
  //////////////////////////////////////////////////////////
  // const orderId = trackingid
  ////////////////////////////////////////////////////////////
  const putOrderId = async () => {
    console.log("running");
    const response = await fetch(`/api/order/${order._id}`, {
      method: "PUT",
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': `Bearer ${token}`,
      // },
      body: JSON.stringify(trackingid),
    });
  };

  const ordertrackId = order?.tracking_id;

  if (!ordertrackId && order !== "ERROR") {
    putOrderId();
  }
  /////////////////////////////track///////////////////////////
  if (order !== "ERROR" && token !== undefined) {
    (async () => {
      const data = {
        token: token,
        trackingID: ordertrackId,
      };
      const response = await fetch("/api/shiprocket/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      // console.log(jsonData);
    })();
  }

  if (tracking.length > 10) {
    var trackingObj = JSON.parse(tracking);
    var trackStatus = trackingObj?.tracking_data?.track_status;
    // console.log("track_status:", trackStatus);
  }

  // console.log(order.id);

  return (
    <div>
      {isorder == "ERROR" ? (
        <div className={styles.success}>
          <div className={styles.successIcon}>
            {/*  */}
            <div className="ui-error">
              <svg
                viewBox="0 0 87 87"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g id="Group-2" transform="translate(2.000000, 2.000000)">
                    <circle
                      id="Oval-2"
                      stroke="#77a31f"
                      strokeWidth="4"
                      cx="41.5"
                      cy="41.5"
                      r="41.5"
                    ></circle>
                    <circle
                      className="ui-error-circle"
                      stroke="rgba(199, 255, 88, 0.643)"
                      strokeWidth="4"
                      cx="41.5"
                      cy="41.5"
                      r="41.5"
                    ></circle>
                    <path
                      className="ui-error-line1"
                      d="M22.244224,22 L60.4279902,60.1837662"
                      id="Line"
                      stroke="#77a31f"
                      strokeWidth="3"
                      strokeLinecap="square"
                    ></path>
                    <path
                      className="ui-error-line2"
                      d="M60.755776,21 L23.244224,59.8443492"
                      id="Line"
                      stroke="#77a31f"
                      strokeWidth="3"
                      strokeLinecap="square"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>

            {/*  */}
          </div>

          <div className={styles.successBtnContainer}>
            <div className={styles.successBtn} onClick={() => router.push("/")}>
              Continue shopping
            </div>
            <div
              className={styles.successBtn}
              onClick={() => router.push("https://wa.link/83a0qt")}
            >
              contact us
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.success}>
          <div className={styles.successIcon}>
            {/*  */}
            <div className="ui-success">
              <svg
                viewBox="0 0 87 87"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  strokeWidth="1"
                  fill="none"
                  fillRule="evenodd"
                >
                  <g id="Group-3" transform="translate(2.000000, 2.000000)">
                    <circle
                      id="Oval-2"
                      stroke="rgba(165, 220, 134, 0.2)"
                      strokeWidth="4"
                      cx="41.5"
                      cy="41.5"
                      r="41.5"
                    ></circle>
                    <circle
                      className="ui-success-circle"
                      id="Oval-2"
                      stroke="#A5DC86"
                      strokeWidth="4"
                      cx="41.5"
                      cy="41.5"
                      r="41.5"
                    ></circle>
                    <polyline
                      className="ui-success-path"
                      id="Path-2"
                      stroke="#A5DC86"
                      strokeWidth="4"
                      points="19 38.8036813 31.1020744 54.8046875 63.299221 28"
                    ></polyline>
                  </g>
                </g>
              </svg>
            </div>

            {/*  */}
          </div>
          <div className={styles.successText}>
            <div className={styles.successh1}>Order placed</div>
            <div className={styles.successp}>Order ID :{order?._id}</div>
            <div className={styles.successp}>
              Order Qty :{order?.item?.quantity}
            </div>
          </div>
          <div className={styles.successBtnContainer}>
            <div className={styles.successBtn} onClick={() => router.push("/")}>
              Continue shopping
            </div>
            <div
              className={styles.successBtn}
              onClick={() => router.push(`/order/${order?._id}`)}
            >
              Track order status
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface Params {
  id: string;
}

export default Order;
