import React, { useState } from 'react'
import styles from "../../styles/Navbar.module.css";
import Logo from "../../public/logo.png";
import { useSelector } from "react-redux";
import { BiShoppingBag } from "react-icons/bi";
import { RiUserSmileLine } from "react-icons/ri";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";
import Link from 'next/link';
import Image from 'next/image';

import Cookies from "js-cookie"

import getLoggedIn from "../hooks/getLoggedIn";
import Login from '../hooks/login';
function navbar() {
  const quantity:number = useSelector((state:any) => state.cart.quantity);
  const [oppen, setOppen] =useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const log = getLoggedIn();
  const handilclickOppen=()=>{
    // setOppen(true)
    console.log("oppen::"+ oppen)
    setIsOpen(true)
  }
  const handilcliceClosr=()=>{
    setOppen(false)
    setIsOpen(false)
  }
  const logOut = () => {
    Cookies.remove("loggedin");
    // router.push('/login')
    console.log("logout")
  };
  return (
    <div className={styles.container}>

      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} >
      {log  ? 
      <div className={styles.Hamburger} >
        <div className={styles.closeIcon} onClick={()=>handilcliceClosr()}><GrClose/></div>
        <div className={styles.items}>
          <Link href="/order" onClick={()=>handilcliceClosr()}>Order</Link>
          <button onClick={()=> logOut()} style={{width:"20%"}}>logOut</button>
        </div>
        
      </div> :<Login/>}
      </Modal>

      <div onClick={()=>handilclickOppen()}>
           <h1 style={{marginLeft:"10px"}}>
           <RiUserSmileLine color="white"/>
           </h1>
        </div>
       <div className={styles.item}>
         <Link href="/">
           <div className={styles.logo}>
             <Image src={Logo} alt="" className={styles.logoImage} fill />
           </div>
         </Link>
       </div>
       
       <Link href={"/cart"} passHref>
         <div className={styles.item}>
       <div className={styles.cart}>
         <div className={styles.cartIcon}>
           <h1 style={{marginRight:"15px"}}>
           <BiShoppingBag color="white"/>
           </h1>
            </div>
            <div className={styles.cartcounter} style={{color:"white"}}>{quantity}</div>
          </div>
         </div>
       </Link>
    </div>
  )
}

export default navbar
