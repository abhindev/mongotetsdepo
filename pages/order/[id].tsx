import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/OrderID.module.css";
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
  const [isorder, setIsorder] = useState(false);
  // console.log(chash);
  const orderItems = order?.item.products;
  const orderstatus = order?.status;

  var isDisplayed = false;
  if (isDisplayed == false) {
    if (order && isorder == false) {
      setIsorder(true);
      isDisplayed = true;
    }
  }
  return (
    <div>
      {isorder !== true ? (
        <h1>error</h1>
      ) : (
        <>
          <div className={styles.container}>
            <div>
              <div className={styles.orderId}>
                <h3 className={styles.id}>Order ID: {order._id}</h3>
                {/* <h4 className={styles.date}>{formattedDate}</h4> */}
              </div>
              {/* <button onClick={()=>clear()}>clear </button> */}
              <div style={{ borderTop: "1px solid gray", marginTop: "10px" }}>
                {orderItems.map((item: any, i: any) => (
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
              {/* statues */}
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
                            backgroundColor:
                              orderstatus > 1 ? "#77a31f" : "gray",
                          }}
                        ></span>
                        <span
                          className={styles.order_track_status_line}
                          style={{
                            backgroundColor:
                              orderstatus > 1 ? "#77a31f" : "gray",
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
                            backgroundColor:
                              orderstatus > 2 ? "#77a31f" : "gray",
                          }}
                        ></span>
                        <span
                          className={styles.order_track_status_line}
                          style={{
                            backgroundColor:
                              orderstatus > 2 ? "#77a31f" : "gray",
                          }}
                        ></span>
                      </div>
                      <div className={styles.order_track_text}>
                        <p className={styles.order_track_text_stat}>
                          Order Dispatched
                        </p>
                      </div>
                    </div>
                    <div className={styles.order_track_step}>
                      <div className={styles.order_track_status}>
                        <span
                          className={styles.order_track_status_dot}
                          style={{
                            backgroundColor:
                              orderstatus > 3 ? "#77a31f" : "gray",
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
              {/* statest end */}

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
