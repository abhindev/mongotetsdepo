import { useState } from "react";
import {useSelector } from "react-redux";
import CartItem from "../components/template/cart/cartItem";
import CartList from "../components/template/cart/cartList";

import useDeviceSize from "../components/hooks/useWindowSize";
import CheckOut from "../components/template/cart/checkOut";
import styles from "../styles/Cart.module.css";
function Cart() {
  const redux = useSelector((state: any) => state.cart);

  const [ckeckout, setCkeckout] = useState(false);

  const [width, height] = useDeviceSize();
  const h = height - 200;

  const CkeckOut = () => {
    window.scrollTo(0, 0);
    setCkeckout(true);
  };
  const handile_mobsubmit = () => {
    setTimeout(function () {
      window.scrollTo(0, h);
    }, 1);
    setCkeckout(true);
  };

  const cart = redux.products;
  console.log(cart.length);
  return (
    <div className={width > 600 ? styles.cart : styles.mob}>
      {width > 600 ? (
        <div className={styles.container}>
          <div className={styles.left}>
            {ckeckout == true ? <CheckOut /> : <CartItem cart={redux} />}
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
              {cart.length == 0 ? (
                ""
              ) : (
                <div className={styles.total}>
                  <p>Shipping</p>
                  <p>₹50.00</p>
                </div>
              )}

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
                {cart.length == 0 ? "" : <h2>INR {redux.total + 50}.00</h2>}
              </div>
              <div className={styles.btn}>
                {ckeckout == false ? (
                  <button className={styles.button} onClick={() => CkeckOut()}>
                    CkeckOut
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <CartItem cart={redux} />
          <div className={styles.totalDiv}>
            <div className={styles.total}>
              <p>Subtotal</p>
              <p>₹{redux.total}.00</p>
            </div>
            {cart.length == 0 ? (
              ""
            ) : (
              <div className={styles.total}>
                <p>Shipping</p>
                <p>₹50.00</p>
              </div>
            )}

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
              {cart.length == 0 ? "" : <h2>INR {redux.total + 50}.00</h2>}
            </div>
            <div className={styles.btn}>
              {ckeckout == false ? (
                <button
                  className={styles.button}
                  onClick={() => handile_mobsubmit()}
                >
                  CkeckOut
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          {ckeckout !== false ? <CheckOut /> : ""}
        </>
      )}
    </div>
  );
}

export default Cart;
