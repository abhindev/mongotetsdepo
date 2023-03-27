import { MongoClient, ObjectId } from 'mongodb';
import Image from 'next/image';
import styles from '../../styles/OrderID.module.css'
import myGif from '../../public/img/error.gif'
interface OrderProps {
  order: {
    _id: string;
    customer: string;
    method: number;
    item:any;
    status:number
  } | any;
  chash:any
}


const Order = ({ order ,chash}: OrderProps) => {
  console.log(order);
  console.log(chash)

// const date = new Date(order.createdAt);
// const year = date.getFullYear();
// const month = date.getMonth() + 1;
// const day = date.getDate();
// const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

  const order_status = chash
  const orderItems = order?.item.products;
  const orderstatus = order?.status

  return (
    <div>
    {/* {order_status == "PAID" ?  */}
    <><div className={styles.container}>
    <div>
    <div className={styles.orderId}>
      <h3 className={styles.id} >Order ID: {order._id}</h3>
      {/* <h4 className={styles.date}>{formattedDate}</h4> */}
    </div>
    {/* <button onClick={()=>clear()}>clear </button> */}
    <div style={{borderTop:"1px solid gray" ,marginTop:"10px",}}>
    {orderItems.map((item:any, i:any)=>
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
      
    </div> )}
    </div>
    {/* statues */}
<div className={styles.order_track}>
  {order_status == "PAID" ? <>  <div className={styles.order_track_step}>
    <div className={styles.order_track_status}>
      <span className={styles.order_track_status_dot}></span>
      <span className={styles.order_track_status_line}></span>
      
    </div>
   
    <div className={styles.order_track_text}>
      <p className={styles.order_track_text_stat}>Order Received</p>
    </div>
  </div>
  <div className={styles.order_track_step}>
    <div className={styles.order_track_status}>
      <span className={styles.order_track_status_dot}></span>
      <span className={styles.order_track_status_line}></span>
    </div>
    <div className={styles.order_track_text}>
      <p className={styles.order_track_text_stat}>Order Processed</p>
    </div>
  </div>
  <div className={styles.order_track_step}>
    <div className={styles.order_track_status}>
      <span className={styles.order_track_status_dot} style={{backgroundColor: orderstatus>1?  "#77a31f": "gray"}}></span>
      <span className={styles.order_track_status_line} style={{backgroundColor: orderstatus>1?  "#77a31f": "gray"}}></span>
    </div>
    <div className={styles.order_track_text}>
      <p className={styles.order_track_text_stat}>Manufracturing In Progress</p>
    </div>
  </div>
  <div className={styles.order_track_step}>
    <div className={styles.order_track_status}>
      <span className={styles.order_track_status_dot} style={{backgroundColor: orderstatus>2?  "#77a31f": "gray"}}></span>
      <span className={styles.order_track_status_line} style={{backgroundColor: orderstatus>2?  "#77a31f": "gray"}}></span>
    </div>
    <div className={styles.order_track_text}>
      <p className={styles.order_track_text_stat}>Order Dispatched</p>
    </div>
  </div>
  <div className={styles.order_track_step}>
    <div className={styles.order_track_status}>
      <span className={styles.order_track_status_dot} style={{backgroundColor: orderstatus>3?  "#77a31f": "gray"}}></span>
      <span className={styles.order_track_status_line} ></span>
    </div>
    <div className={styles.order_track_text}>
      <p className={styles.order_track_text_stat}>Order Deliverd</p>
    </div>
  </div> </> : null}
  
</div>
    {/* statest end */}
    
    <div className={styles.address}>
      <h3>Delivery</h3>
      <p>Address</p>
      <h2>{order?.customer}</h2>
      <p>{order.address.Address}, {order.address.City} ,{order.address.State}, {order.address.pinCode}</p>
    </div>
    </div> 
  </div></> 
  {/* // : <div className={styles.Error}>
  //   <Image src={myGif} alt=""  width={500}/>
  //   </div>} */}
  </div>
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

    const resone = await fetch(`/api/order/chashfree/${params.id}`);
    const chash = await resone.json();
    const orderStatus =(chash.data.order_status)

    // Find the order to be updated
    const order = await db.collection('orders').findOne({ _id: new ObjectId(params.id) });
       const data =(JSON.parse(JSON.stringify(order)));
       const status = (data.status);
    // Update the order with method: 1
    // const updatedOrder = await db.collection('orders').updateOne(
    //   { _id: new ObjectId(params.id) },
    //   { $set: { method: 6 } }
    // );

    // console.log(updatedOrder);
    //get chashfree 
    
    
    if(orderStatus=="PAID" && status == 0 ){
      const updatedOrder = await db.collection('orders').updateOne(
        { _id: new ObjectId(params.id) },
        { $set: { status: 1 } }
      );
    }if(orderStatus == "ACTIVE" && status == 0){
      const deletOrder = await db.collection('orders').deleteOne(
        { _id: new ObjectId(params.id) },
      );
    }

      // console.log(params.id)
    return {
      props: {
        order: JSON.parse(JSON.stringify(order)),
        chash: orderStatus,
        // chashfree:
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        order: null,
        chash:null
      },
    };
  }
};

export default Order;
