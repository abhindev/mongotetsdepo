import React from 'react'
import { BsWhatsapp } from "react-icons/bs";
import styles from "../../styles/whatsapp.module.css"
function whatsapp() {
  return (
    <div className={styles.whatsapp}>
        <div className={styles.wbtn} onClick={()=>window.open("https://wa.link/83a0qt")}>
        <BsWhatsapp />
        </div>
      </div>
  )
}

export default whatsapp
