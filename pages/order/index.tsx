import Image from "next/image";
import React,{useState}from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../lib/redux/orderSlice";
import styles from "../.././styles/Order.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import OrderItem from "../../components/template/order/orderItem"
export async function getServerSideProps(context: any) {
  // Parse cookies from the incoming request
  const cookies = parseCookies(context);

  // Access a specific cookie value
  const loggedIn = cookies.loggedin;
  console.log(loggedIn);

  // Fetch data from an API with the "loggedIn" cookie value in the request headers
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOM}/api/order`, {
    method: "GET",
    headers: {
      Cookie: `loggedin=${loggedIn}`, // Include the cookie value in the request headers
    },
  });

  const data = await response.json();

  // Pass fetched data as props to the page component
  return {
    props: {
      data,
    },
  };
}

function Order({ data }: any) {
  
  function getCookieValue(cookieName: any) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(";");
    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }
  var loggedinValue = getCookieValue("loggedin");
  // console.log("log: " + loggedinValue);

  // console.log(data);
  
  // console.log(data);
  //delet order

  

  // const showIdFn =()=> {
  //   setShowId(true)
  // }
  

  return (
    <div className={styles.orderindex}>
      <h3 style={{fontWeight:10,marginLeft:"10vw"}}>Your Orders</h3>
      {/* <button onClick={()=>handleDelete()}>delet</button> */}
<div 
    style={{display: "flex",
    flexDirection: "column-reverse"}}
>
      {data.map((order:any, i: number) => (
        <div className={styles.rev} key={i}>
          <div className={styles.innerDiv}>
            <OrderItem order={order}/>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Order;

// <Link href={`order/${order._id}`} style={{ textDecoration: "none" }} key={i}>
// <div key={i} className={styles.rev}>
//   <div className={styles.imagecontainer}>
//     <Image
//       src={order.item.products[0].img[0]}
//       alt=""
//       width={100}
//       height={100}
//     />
//     <div>
//       <span>
//         {order.item.products.length > 1 ? (
//           <>
//             <h2>{order.item.products[0].title}</h2>{" "}
//             <p>and more {order.item.products.length}</p>
//           </>
//         ) : (
//           <>
//             <h2>{order.item.products[0].title}</h2>
//           </>
//         )}
//       </span>
//     </div>

//     <div></div>
//   </div>
// </div>
// </Link>
