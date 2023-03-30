import React, { useState } from 'react'
import styles from "../../styles/Navbar.module.css";
import logo from "/img/logo.png";
import { useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";
import { HiMenuAlt2 } from "react-icons/hi";
import { GrClose } from "react-icons/gr";
import Hamburger from '../tools/Hamburger'

import Link from 'next/link';
import Image from 'next/image';


function navbar() {
  const quantity:number = useSelector((state:any) => state.cart.quantity);
  const [oppen, setOppen] =useState(false)
  const handilclickOppen=()=>{
    setOppen(true)
    console.log("oppen::"+ oppen)
  }
  const handilcliceClosr=()=>{
    setOppen(false)
  }
  return (
    <div className={styles.container}>



      {oppen == true ? 
      <div className={styles.Hamburger} >
        <div className={styles.closeIcon} onClick={()=>handilcliceClosr()}><GrClose/></div>
        <div className={styles.items}>
          <Link href="/order" onClick={()=>handilcliceClosr()}>Order</Link>
        </div>
      </div> : 
      ''}
      













      <div onClick={()=>handilclickOppen()}>
           <h1>
           <HiMenuAlt2 />
           </h1>
        </div>
       <div className={styles.item}>
         <Link href="/">
           <div className={styles.logo}>
             <Image src='/img/logo.png' alt="" className={styles.logoImage} fill />
           </div>
         </Link>
       </div>
       
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
