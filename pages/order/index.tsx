import Image from 'next/image';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../lib/redux/orderSlice";
import styles from "../.././styles/Order.module.css"
import Link from 'next/link';

function Order() {
  const order = useSelector((state: any) => state.order);
  const dispatch = useDispatch();
  const on = ()=>{
    dispatch(reset());
    console.log(order);
  }
  const orders = order.orders
  console.log(orders);
  return (
    <div className={styles.orderindex}>
      <h1>order</h1>
      {order.orders.map((order:any, i:number)=>
      <Link href={`order/${order._id}`} style={{textDecoration:"none"}}>
        <div key={i} className={styles.rev}>
          <div className={styles.imagecontainer}>
            <Image src={order.item.products[0].img[0]} alt="" width={100} height={100}/>
            <div>
              <span>{order.item.products.length>1? 
              <>
              <h2>{order.item.products[0].title}</h2> <p>and more {order.item.products.length}</p>
              </> : 
              <>
              <h2>
              {order.item.products[0].title}
              </h2>
              
              </>
              }</span>
            </div>
            
            <div>
            </div>
          </div>
          
        </div>
        </Link>
      )}
    </div>
  )
}

export default Order
