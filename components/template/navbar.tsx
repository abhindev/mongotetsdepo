import React, { useState, useEffect } from "react";
import styles from "../../styles/Navbar.module.css";
import Logo from "../../public/logo.png";
import { useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import { BsWhatsapp } from "react-icons/bs";
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

  const [showDiv, setShowDiv] = useState(false);

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
      backgroundColor: "rgb(218 215 215)",
      top: "17%",
      left: "5%",
      right: `${width > 600 ? "70vw" : "5%"}`,
      bottom: "10%",
    },
  };
  const handleClickCart = () => {
    if (quantity !== 0) {
      router.push("/cart");
    } else {
      setShowDiv(true);
    }
  };

  useEffect(() => {
    let timer: any;
    if (showDiv) {
      // After 5 seconds, hide the div
      timer = setTimeout(() => {
        setShowDiv(false);
      }, 4000);
    }

    // Clean up the timer when component unmounts or when showDiv changes
    return () => {
      clearTimeout(timer);
    };
  }, [showDiv]);

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
              <a href="/" onClick={() => handilcliceClosr()}>
                Home
              </a>

              <a href="/order" onClick={() => handilcliceClosr()}>
                Orders
              </a>
              <a href="https://wa.link/83a0qt" onClick={() => handilcliceClosr()}>
                Contact us
              </a>
              <a  href="/product/6409a6d1c8363009643569e1" target="_blank" onClick={() => handilcliceClosr()}>
                Buy Hair Oil
              </a>
              <div className={styles.logoutcontainner}>
                <button onClick={() => logOut()} className={styles.logOut}>
                  Sign Out
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
          <HiOutlineUserCircle color="white" />
        </h1>
      </div>
      <div className={styles.item}>
        <div onClick={() => router.push("/")}>
          <div className={styles.logo}>
            <Image src={Logo} alt="" className={styles.logoImage} fill />
          </div>
        </div>
      </div>

      <div onClick={() => handleClickCart()}>
        <div className={styles.item}>
          <div className={styles.cart}>
            <div className={styles.cartIcon}>
              <h1 style={{ marginRight: "15px" }}>
                <BiShoppingBag color="white" />
              </h1>
            </div>
            <div>
              {showDiv && (
                <div className={styles.noItem}>
                  <div className={styles.noItmeText}>Cart Is Empty</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.whatsapp}>
        <div className={styles.btn} onClick={()=>window.open("https://wa.link/83a0qt")}>
        <BsWhatsapp />
        </div>
      </div>
    </div>
  );
}

export default navbar;
