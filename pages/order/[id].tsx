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
  // console.log(isorder);

  // console.log(chash);
  const orderItems = order?.item?.products;
  // console.log(orderItems)
  const orderstatus = order?.status;

  console.log(orderstatus)
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
    arrayItem.push(
      { 
        name: item?.title,
          sku: item?._id+i,
          units: item?.quantity,
          selling_price: item.price,
          discount: "",
          tax: "",
          hsn: 441122,
      }
      );
  });
  // console.log(order);


  // const value = arrayItem;
  // console.log(value + " : " + typeof value);

  if (order && orderstatus == 0 ) {
    console.log("running")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0NzEwNzYsImlzcyI6Imh0dHBzOi8vYXBpdjIuc2hpcHJvY2tldC5pbi92MS9leHRlcm5hbC9hdXRoL2xvZ2luIiwiaWF0IjoxNjgxNTM5NjY3LCJleHAiOjE2ODI0MDM2NjcsIm5iZiI6MTY4MTUzOTY2NywianRpIjoiN1llQktxNFZKZWQxT2FBbiJ9.OUabAxvnci7YD1hiEMqZ8hTRp7w0AtnX6MtuR3y_55g");

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
                <div className={styles.order_track_step}>
                  <div className={styles.order_track_status}>
                    <span className={styles.order_track_status_dot}></span>
                    <span className={styles.order_track_status_line}></span>
                  </div>

                  <div className={styles.order_track_text}>
                    <p className={styles.order_track_text_stat}>
                      Order Received
                    </p>
                  </div>
                </div>
                <div className={styles.order_track_step}>
                  <div className={styles.order_track_status}>
                    <span className={styles.order_track_status_dot}></span>
                    <span className={styles.order_track_status_line}></span>
                  </div>
                  <div className={styles.order_track_text}>
                    <p className={styles.order_track_text_stat}>
                      Order Processed
                    </p>
                  </div>
                </div>
                <div className={styles.order_track_step}>
                  <div className={styles.order_track_status}>
                    <span
                      className={styles.order_track_status_dot}
                      style={{
                        backgroundColor: orderstatus > 1 ? "#77a31f" : "gray",
                      }}
                    ></span>
                    <span
                      className={styles.order_track_status_line}
                      style={{
                        backgroundColor: orderstatus > 1 ? "#77a31f" : "gray",
                      }}
                    ></span>
                  </div>
                  <div className={styles.order_track_text}>
                    <p className={styles.order_track_text_stat}>
                      Manufracturing In Progress
                    </p>
                  </div>
                </div>
                <div className={styles.order_track_step}>
                  <div className={styles.order_track_status}>
                    <span
                      className={styles.order_track_status_dot}
                      style={{
                        backgroundColor: orderstatus > 2 ? "#77a31f" : "gray",
                      }}
                    ></span>
                    <span
                      className={styles.order_track_status_line}
                      style={{
                        backgroundColor: orderstatus > 2 ? "#77a31f" : "gray",
                      }}
                    ></span>
                  </div>
                  <div className={styles.order_track_text}>
                    <p className={styles.order_track_text_stat}>
                      Order Dispatched
                    </p>
                    {order?.Trackingnumber ? (
                      <>
                        <a
                          target="_blank"
                          href={`https://www.google.com/search?q=dtdc+tracking+R60309980&sxsrf=APwXEdclAnqAEtOFPKFPlVzEn-Xih1xt8Q%3A1680161514618&ei=6jolZJWsJcDZ4-EPo_uz8A8&ved=0ahUKEwiVyfmxkYP-AhXA7DgGHaP9DP4Q4dUDCA8&uact=5&oq=dtdc+tracking+${order.Trackingnumber}&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzoKCAAQRxDWBBCwAzoECAAQAzoGCAAQFhAeSgQIQRgAUPMBWPkGYPMKaAFwAXgAgAFoiAHPAZIBAzAuMpgBAKABAaABAsgBCMABAQ&sclient=gws-wiz-serp`}
                        >
                          <div>tracking id: {order.Trackingnumber}</div>
                        </a>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={styles.order_track_step}>
                  <div className={styles.order_track_status}>
                    <span
                      className={styles.order_track_status_dot}
                      style={{
                        backgroundColor: orderstatus > 3 ? "#77a31f" : "gray",
                      }}
                    ></span>
                    <span className={styles.order_track_status_line}></span>
                  </div>
                  <div className={styles.order_track_text}>
                    <p className={styles.order_track_text_stat}>
                      Order Deliverd
                    </p>
                  </div>
                </div>
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
