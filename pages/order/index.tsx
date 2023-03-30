import Image from 'next/image';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../lib/redux/orderSlice";
import styles from "../.././styles/Order.module.css"
import Link from 'next/link';
import { useRouter } from 'next/router'

function Order() {
  const order = useSelector((state: any) => state.order);
  const router = useRouter()
  const dispatch = useDispatch();
  const on = ()=>{
    dispatch(reset());
    console.log(order);
  }
  const orders = order.orders
  console.log(orders);
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   router.push(href)
  // }
  return (
    <div>
      <h1>order</h1>
      <button onClick={()=>{
        on()
      }}>clear</button>
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
            <div>{order.item.total}</div>
            <div>{order.status}</div>
            <div>
            {/* {console.log("getBackgroundColor")} */}
            {/* {order.status==0 ? handleRemove(i, order,orderItem) : demo()} */}
            </div>
            {/* {order.item.products.length>1? <h1>{order.item.products.length}</h1> : null} */}
          </div>
          
        </div>
        </Link>
      )}
    </div>
  )
}

export default Order
