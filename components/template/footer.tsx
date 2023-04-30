import styles from "../..//styles/Footer.module.css";

import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";

import useDeviceSize from "../hooks/useWindowSize";
import Link from "next/link";
import { useRouter } from "next/router";

function footer() {
  const [width, height] = useDeviceSize();
  const router = useRouter();
  return (
    <div className={styles.footer}>
      <div className={styles.top}>
        <h1 className={styles.title}>Connect with us</h1>
        <div className={styles.social}>
          <div className={styles.icon}>
            <div
              onClick={() =>
                window.open("https://www.facebook.com/kalyaniammawayanad")
              }
            >
              <BsFacebook />
            </div>
          </div>
          <div className={styles.icon}>
            <div
              onClick={() =>
                window.open("https://instagram.com/kalyaniammahairoil")
              }
            >
              <BsInstagram />
            </div>
          </div>
          <div className={styles.icon}>
            <div onClick={() => window.open("https://wa.link/83a0qt")}>
              <BsWhatsapp />
            </div>
          </div>
        </div>
      </div>
      <div className={width > 600 ? styles.bottom : styles.bottom_mob}>
        <div className={styles.contact}>
          <h3 style={{ fontWeight: 400 }}>Contact</h3>
          <a href="tel: 918606531201">918606531201</a>
          <a href="mailto: kalyaniammahairoil@gmail.com" >kalyaniammahairoil@gmail.com</a>
        </div>
        <div style={{display:"flex",flexDirection: "column",
    marginBottom: "20px"}}>
          <h3 style={{ fontWeight: 400 }}>Support</h3>
          
          <a style={{color:"black" ,cursor:"pointer",margin:"2px"}} href="/policys/contactus">Contact us</a>
          <a style={{color:"black" ,cursor:"pointer",margin:"2px"}} href="/policys/aboutus">About us</a>
          <a style={{color:"black" ,cursor:"pointer",margin:"2px"}} href="/policys/faq">FAQ</a>
          <a style={{color:"black" ,cursor:"pointer",margin:"2px"}} href="/policys/returnpolicy">Shipping & Returns</a>
          <a style={{color:"black" ,cursor:"pointer",margin:"2px"}} href="/policys/privacypolicy">Privacy policy</a>
          <a style={{color:"black" ,cursor:"pointer",margin:"2px"}} href="/policys/termsandconditions">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
}

export default footer;
