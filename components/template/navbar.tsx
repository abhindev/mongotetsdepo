import React from 'react'
import styles from "../../styles/Navbar.module.css";
import logo from "/img/logo.png";
import { useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";
import Link from 'next/link';
import Image from 'next/image';

function navbar() {
  const quantity:number = useSelector((state:any) => state.cart.quantity);
  return (
    <div className={styles.container}>
       <div className={styles.item}>
         <Link href="/">
           <div className={styles.logo}>
             <Image src='/img/logo.png' alt="" className={styles.logoImage} fill />
           </div>
         </Link>
       </div>
       <Link href={"/order"} passHref>     
           <h1>
           <BiShoppingBag />
           </h1>

       </Link>
       <Link href={"/cart"} passHref>
         <div className={styles.item}>
       <div className={styles.cart}>
         <div className={styles.cartIcon}>
           <h1>
           <BiShoppingBag />
           </h1>
            </div>
            <div className={styles.cartcounter}>{quantity}</div>
          </div>
         </div>
       </Link>
    </div>
  )
}

export default navbar
