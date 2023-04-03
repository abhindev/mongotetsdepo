import React from "react";
import styles from "../..//styles/Footer.module.css";

import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

import useDeviceSize from "../hooks/useWindowSize";
import Link from "next/link";

function footer() {
  const [width, height] = useDeviceSize();
  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <h1 className={styles.title}>Connect with us</h1>
        <div className={styles.social}>
          <div className={styles.icon}>
            <Link href={""}>
          <BsFacebook/>
            </Link>
          </div>
          <div className={styles.icon}>
          <Link href={""}>
          <BsInstagram/>
          </Link>
          </div>
          <div className={styles.icon}>
          <Link href={""}>
          <BsWhatsapp/>
          </Link>
          </div>
        </div>
      </div>
      <div className={width>600?styles.bottom:styles.bottom_mob}>
        <div>
          <h3>Contact</h3>
          <p>918606531201</p>
          <p>kalyaniammahairoil@gmail.com</p>
        </div>
        <div>
          <h3>Support</h3>
          <p>About us</p>
          <p>Shipping & Returns
Track your order
Privacy policy
Terms and Conditions</p>
        </div>
      </div>
    </div>
  );
}

export default footer;
