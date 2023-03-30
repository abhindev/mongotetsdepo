import Image from 'next/image'
import React from 'react'
import styles from '../../..//styles/list.module.css'
function cartList({cart}:any) {
  console.log(cart)
  const item = cart
  return (
    <>
    <div className={styles.list}>
      <div className={styles.image}>
        <div className={styles.imagediv}>
          <Image src={item.img[0]} alt="" fill />
        </div>
        </div>
      <div className={styles.text}>
        <div className={styles.text}>
          <div style={{display:"flex", flexDirection:"column",}}>
            <h2 style={{margin:0}}>{item.title}</h2>
            <h5 style={{margin:0}}>{item.variant}</h5>
            <h3 style={{margin:0}}>{item.quantity}X{item.price}</h3>
          </div>
        </div>
        <div className={styles.price}>
           <h2>{item.quantity*item.price}</h2>
        </div>
      </div>
    </div>
    <div className={styles.lineDiv}>
      <div className={styles.line}></div>
    </div>
    </>
  )
}

export default cartList
