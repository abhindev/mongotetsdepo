import styles from "../..//styles/Footer.module.css";

import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

import useDeviceSize from "../hooks/useWindowSize";
import Link from "next/link";
import { useRouter } from 'next/router'

function footer() {
  const [width, height] = useDeviceSize();
  const router = useRouter()
  return (
    
    <div className={styles.footer}>
      <div className={styles.top}>
        <h1 className={styles.title}>Connect with us</h1>
        <div className={styles.social}>
          <div className={styles.icon}>
            <div onClick={()=>window.open("https://www.facebook.com/kalyaniammawayanad")}>
          <BsFacebook/>
            </div>
          </div>
          <div className={styles.icon}>
          <div onClick={()=>window.open("https://instagram.com/kalyaniammahairoil")}>
          <BsInstagram/>
          </div>
          </div>
          <div className={styles.icon}>
          <div onClick={()=>window.open("https://wa.link/83a0qt")}>
          <BsWhatsapp/>
          </div>
          </div>
        </div>
      </div>
      <div className={width>600?styles.bottom:styles.bottom_mob}>
        <div className={styles.contact}>
          <h3>Contact</h3>
          <a>918606531201</a> 
          <a>kalyaniammahairoil@gmail.com</a>
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
