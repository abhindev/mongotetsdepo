import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../../../styles/ProductCard.module.css'
import useDeviceSize from "../../hooks/useWindowSize";

function ProductCard({product}:any,i:number) {
  const [width, height] = useDeviceSize();
  const index = i


  console.log(product.img[0])

  return (
    <div
      className={width < 600 ? '': styles.container}
      style={
        index % 2 == 0
          ? { flexDirection: "row" }
          : { flexDirection: "row-reverse" }
      }
    ><Link
    href={`/product/${product._id}`}
    passHref
    style={{ textDecoration: "none", color: "#000" }}
  >
      <div className={width < 600 ? styles.left_mob : styles.left} >
        <div className={width<600 ? styles.imgcont_mob : styles.imgcont}>
          <div className={width<600 ?styles.img_mob : styles.img}>
            <Image src={product.img[0]} alt="" fill objectFit="cover" />
          </div>
        </div>
      </div>
      </Link>
      <div className={width<600 ? styles.right_mob : styles.right}>
      <Link
          href={`/product/${product._id}`}
          passHref
          style={{ textDecoration: "none", color: "#000" }}
        >
        <h1 className={width<600 ? styles.title_mob :styles.title}>{product.title}</h1>
        <p className={width<600 ? styles.desc_mob :styles.desc}>{product.desc}</p>
        <p className={width<600 ? styles.price_mob : styles.price}>
          MRP ₹ 
          {/* <h2>{price}</h2> */}
        </p>
        </Link>
        {/* <div className={width<600 ? styles.button_mob:styles.button}>
          <button onClick={()=>handleClickBuyNow()} className={width<600 ? styles.button_buy_mob:styles.button_buy}>BUY NOW</button>
          <button onClick={()=>handleClickAddToCart()} className={width<600 ? styles.button_cart_mob:styles.button_cart}>
            <BiShoppingBag />
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default ProductCard
