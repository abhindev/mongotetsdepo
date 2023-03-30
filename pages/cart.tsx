import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../lib/redux/cartSlice";
import { useRouter } from "next/router";
import CartItem from "../components/template/cart/cartItem";
import CartList from "../components/template/cart/cartList";
// import axios from "axios";
import Link from "next/link";
import useDeviceSize from "../components/hooks/useWindowSize";
// import CheckOut from "../components/ui/CheckOut"
import CheckOut from "../components/template/cart/checkOut";
// import styles from "../styles/Cart.module.css";
import styles from "../styles/Cart.module.css";
function Cart() {
  const redux = useSelector((state: any) => state.cart);
  const quantity = useSelector((state: any) => state.cart.quantity);
  const [submit, setSubmit] = useState(false);
  const [ckeckout, setCkeckout] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();
  const [width, height] = useDeviceSize();
  const h = height + 1000;

  const setCheckoutbtnFn = () => {
    setSubmit(true);
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 1);
  };
  const CkeckOut = ()=>{
    window.scrollTo(0, 0);
    setCkeckout(true)
  }
  const handile_mobsubmit = () => {
    setTimeout(function () {
      window.scrollTo(0, h);
    }, 1);
    setCkeckout(true)
  }
  const clear = () => {
    dispatch(reset());
  };

  const cart = redux.products;
  console.log(redux.total);
  return (
    <div className={width>600 ?styles.cart :styles.mob}>
      {width>600 ?<div className={styles.container}>
        <div className={styles.left}>
          {ckeckout==true ? <CheckOut />:<CartItem cart={redux} />}
        </div>
        <div className={styles.right}>
          {cart.map((product: any, i: number) => (
            <div key={i}>
              <CartList cart={product} />
            </div>
          ))}
          <div className={styles.totalDiv}>
            <div className={styles.total}>
              <p>Subtotal</p>
              <p>₹{redux.total}.00</p>
            </div>
            <div className={styles.total}>
              <p>Shipping</p>
              <p>₹50.00</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgb(89, 96, 94)",
                }}
              ></div>
            </div>
            <div className={styles.total}>
              <div>
                <h4>Total</h4>
                <p>ncluding 18% in taxes</p>
              </div>
              <h2>INR {redux.total + 50}.00</h2>
            </div>
            <div className={styles.btn}>
              {
                ckeckout==false ?<button className={styles.button} onClick={()=>CkeckOut()}>CkeckOut</button>: ""
              }
            </div>
          </div>
        </div>
      </div> : <>
      
      <CartItem cart={redux} />
     <div className={styles.totalDiv}>
            <div className={styles.total}>
              <p>Subtotal</p>
              <p>₹{redux.total}.00</p>
            </div>
            <div className={styles.total}>
              <p>Shipping</p>
              <p>₹50.00</p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgb(89, 96, 94)",
                }}
              ></div>
            </div>
            <div className={styles.total}>
              <div>
                <h4>Total</h4>
                <p>ncluding 18% in taxes</p>
              </div>
              <h2>INR {redux.total + 50}.00</h2>
            </div>
            <div className={styles.btn}>
              {
                ckeckout==false ?<button className={styles.button} onClick={()=>handile_mobsubmit()}>CkeckOut</button>: ""
              }
            </div>
          </div>
      {
        ckeckout==false ? <button onClick={()=>handile_mobsubmit()}>
        submit
        </button> : ""
      }
      
      {
        ckeckout!==false ? <CheckOut /> : ""
      }
      
      </>
      }
      
    </div>
  );
}

export default Cart;

{
  /* <div>
      <div className={styles.head}>
        <h1 className={styles.title}>My Bag</h1>
        <h1 className={styles.price}>₹{cart.total}</h1>
      </div>
      <div className={width> 600 ? styles.screenbig: ''}>
      <div className={width > 600 ? styles.left : ""}>
        <CartItem cart={cart} />
      </div>
      <div className={width>600? styles.right: ''} >
      <div>
        <div className={styles.total}>
          <div className={width>600 ? ''  : styles.none}>

          </div>
          <div className={styles.subtotal}>
            <p className={styles.totaltext}>Subtotal</p>
            <p className={styles.totalnum}>₹{cart.total}</p>
          </div>
          <div className={styles.subtotal}>
            <p>Shipping</p>
            <p className={styles.totalnum}>₹{quantity > 0 ? 50 : "0.00"}</p>
          </div>
        </div>
        <div className={styles.sum}>
          <div>
            <h3>Total</h3>
            <h5>Including taxes</h5>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h5>INR</h5>
            <h2>₹{quantity > 0 ? cart.total + 50 : "0.00"}</h2>{" "}
          </div>
        </div>
      </div>
      {submit == true ? (
        <div style={width<600 ? {} : {display:"none"}}>
          <CheckOut />
        </div>
      ) : (
        <div className={styles.checkout}>
          <button
            className={styles.checkout_btn}
            onClick={() => {
              setCheckoutbtnFn();
            }}
          >
            {submit == false ? "checkout" : "submit"}
          </button>
        </div>
      )}
      </div>
      </div>
      <CheckOut />
      <button onClick={() => clear()}>clear</button>
    </div> */
}
