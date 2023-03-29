import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../lib/redux/cartSlice";
import { useRouter } from "next/router";
import CartItem from "../components/template/cart/cartItem";
// import axios from "axios";
import Link from "next/link";
import useDeviceSize from "../components/hooks/useWindowSize";
// import CheckOut from "../components/ui/CheckOut"
import CheckOut from "../components/template/cart/checkOut";
import styles from "../styles/Cart.module.css";
function Cart() {
  const cart = useSelector((state: any) => state.cart);
  const quantity = useSelector((state: any) => state.cart.quantity);
  const [submit, setSubmit] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();
  const [width, height] = useDeviceSize();
  const h =(height+1000)
  const setCheckoutbtnFn = () => {
    setSubmit(true);
    setTimeout(function() {
      window.scrollTo(0, h);
    }, 1);
    
  };
  const clear = () => {
    dispatch(reset());
  };

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>My Bag</h1>
        <h1 className={styles.price}>₹{cart.total}</h1>
      </div>
      <CartItem cart={cart} />
      <div>
        <div className={styles.total}>
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
        <CheckOut />
        // <>hay</>
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

      <button onClick={() => clear()}>clear</button>
    </div>
  );
}

export default Cart;