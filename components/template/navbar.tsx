import React, { useState } from "react";
import styles from "../../styles/Navbar.module.css";
import Logo from "../../public/logo.png";
import { useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import Image from "next/image";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import getLoggedIn from "../hooks/getLoggedIn";
import Login from "../hooks/login";
import useDeviceSize from "../hooks/useWindowSize";
function navbar() {
  const quantity: number = useSelector((state: any) => state.cart.quantity);
  const [oppen, setOppen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const log = getLoggedIn();
  const router = useRouter();
  const handilclickOppen = () => {
    setIsOpen(true);
  };
  const handilcliceClosr = () => {
    setOppen(false);
    setIsOpen(false);
  };
  const logOut = () => {
    Cookies.remove("loggedin");
    window.location.reload();
  };
  const [width] = useDeviceSize();
  const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
    content: {
      border: "none",
      backgroundColor: "#fff",
      top: "10%",
      left: "1%",
      right: `${width > 600 ? "70vw" : "1%"}`,
      bottom: "1%",
    },
  };

  return (
    <div className={styles.container}>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        {log ? (
          <div className={styles.Hamburger}>
            <div
              className={styles.closeIcon}
              onClick={() => handilcliceClosr()}
            >
              <GrClose />
            </div>
            <div className={styles.items}>
              <a href="/order" onClick={() => handilcliceClosr()}>
                Order
              </a>
              <div className={styles.logoutcontainner}>
                <button onClick={() => logOut()} className={styles.logOut}>
                  logOut
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div
              className={styles.closeIcon}
              onClick={() => handilcliceClosr()}
            >
              <GrClose />
            </div>
            <Login />
          </div>
        )}
      </Modal>

      <div onClick={() => handilclickOppen()}>
        <h1 style={{ marginLeft: "10px" }}>
          <HiOutlineUser color="white" />
        </h1>
      </div>
      <div className={styles.item}>
        <div onClick={() => router.push("/")}>
          <div className={styles.logo}>
            <Image src={Logo} alt="" className={styles.logoImage} fill />
          </div>
        </div>
      </div>

      <div onClick={() => router.push("/cart")}>
        <div className={styles.item}>
          <div className={styles.cart}>
            <div className={styles.cartIcon}>
              <h1 style={{ marginRight: "15px" }}>
                <BiShoppingBag color="white" />
              </h1>
            </div>
            <div className={styles.cartcounter} style={{ color: "white" }}>
              {quantity}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default navbar;
