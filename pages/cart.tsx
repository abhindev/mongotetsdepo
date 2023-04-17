import { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/template/cart/cartItem";
import CartList from "../components/template/cart/cartList";

import useDeviceSize from "../components/hooks/useWindowSize";
import CheckOut from "../components/template/cart/checkOut";
import styles from "../styles/Cart.module.css";

import { useRouter } from "next/router";
import getLoggedIn from "../components/hooks/getLoggedIn";
import Login from "../components/hooks/login";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";
function Cart() {
  const redux = useSelector((state: any) => state.cart);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const log = getLoggedIn();
  const [ckeckout, setCkeckout] = useState(false);

  const [width, height] = useDeviceSize();
  const h = height - 200;

  const CkeckOut = () => {
    // window.scrollTo(0, 0);
    // if (!log) {
    setIsOpen(true);
    // } else {
    setCkeckout(true);

    // }
  };
  const handile_mobsubmit = () => {
    // setTimeout(function () {
    //   window.scrollTo(0, h);
    // }, 1);
    setIsOpen(true);
    setCkeckout(true);
    // console.log("running"+ ckeckout)
    // if (!log) {
    //   setIsOpen(true);
    // } else {
    //   setIsOpen(true);
    //   setCkeckout(true);

    // }
  };
  const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
    content: {
      borderRadius: "0",
      backgroundColor: "rgb(218 215 215)",
      top: "8%",
      left: "0%",
      right: "0%",
      bottom: "0%",
    },
  };
  const customStyless = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
    content: {
      border: "none",
      backgroundColor: "rgb(218 215 215)",
      top: "17%",
      left: "5%",
      right: `${width > 600 ? "70vw" : "5%"}`,
      bottom: "10%",
    },
  };
  const cart = redux.products;
  console.log(cart.length);

  const modelClose = () => {
    setIsOpen(false);
    setCkeckout(false);
  };
  return (
    <div className={width > 600 ? styles.cart : styles.mob}>
      {width > 600 ? (
        <div className={styles.container}>
          <div className={styles.left}>
            {ckeckout == true ? (
              <>
              {log ? (
                <Modal
                  isOpen={isOpen}
                  onRequestClose={() => setIsOpen(false)}
                  style={customStyles}
                >
                  <div className={styles.close} onClick={() => modelClose()}>
                    <GrClose />
                  </div>
                    <div className={styles.checkoutmodel}>
                      <CheckOut />
                    </div>
                </Modal> ):(
                <Modal
                  isOpen={isOpen}
                  onRequestClose={() => setIsOpen(false)}
                  style={customStyless}
                >
                  <div className={styles.close} onClick={() => modelClose()}>
                    <GrClose />
                  </div>
                    <Login />
                </Modal>)}
              </>
            ) : (
              <CartItem cart={redux} />
            )}
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
                  <p>Including 18% in taxes</p>
                </div>
                {cart.length == 0 ? "" : <h2>INR {redux.total + 50}.00</h2>}
              </div>
              <div className={styles.btn}>
                {/* {ckeckout == false ? ( */}
                <button className={styles.button} onClick={() => CkeckOut()}>
                  {log == true ? "CONTINU" : "CHECKOUT"}
                </button>
                {/* ) : (
                  ""
                )} */}
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
                <p>Including 18% in taxes</p>
              </div>
              {cart.length == 0 ? "" : <h2>INR {redux.total + 50}.00</h2>}
            </div>
            <div className={styles.btn}>
              {ckeckout == false ? (
                <button
                  className={styles.button}
                  onClick={() => handile_mobsubmit()}
                >
                  {log == true ? "CONTINU" : "CHECKOUT"}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* {ckeckout !== false ? ( */}
          <>
            <Modal
              isOpen={isOpen}
              onRequestClose={() => setIsOpen(false)}
              style={customStyles}
            >
              <div style={{ width: "100%" }}>
                <button
                  onClick={() => modelClose()}
                  className={styles.closebtn}
                >
                  <GrClose />
                </button>
              </div>
              {log ? <CheckOut /> : <Login />}
            </Modal>
          </>
        </>
      )}
    </div>
  );
}

export default Cart;
