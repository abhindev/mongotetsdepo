import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/ProductCard.module.css";
import useDeviceSize from "../../hooks/useWindowSize";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../lib/redux/cartSlice";

import { BiShoppingBag } from "react-icons/bi";

function ProductCard({ product, i }: any) {
  const [width, height] = useDeviceSize();

  const router = useRouter();
  const dispatch = useDispatch();

  const item = product;
  const index = i;
  const price = item.prices[0].price;
  const quantity = 1;

  const variant = item.prices[0].text;

  const handleClickAddToCart = () => {
    dispatch(addProduct({ ...product, price, quantity, variant }));
  };
  const handleClickBuyNow = () => {
    dispatch(addProduct({ ...product, price, quantity, variant }));
    router.push("/cart");
  };
  console.log(width);
  console.log(index % 2);
  return (
    <div
      className={width < 600 ? styles.container_mob : styles.container}
      style={
        index % 2 == 0
          ? { flexDirection: "row" }
          : { flexDirection: "row-reverse" }
      }
    >
      <div
        className={width < 600 ? "" : styles.container}
        style={
          index % 2 == 0
            ? { flexDirection: "row" }
            : { flexDirection: "row-reverse" }
        }
      >
        <div style={{ flex: 1 }} className={styles.left}>
          <div className={width < 600 ? styles.imgcont_mob : styles.imgcont}>
          {/* <Link href={`/product/${product._id}`} > */}
          <div onClick={()=>router.push(`/product/${product._id}`)}>
            <div className={width < 600 ? styles.img_mob : styles.img}>
              <Image src={product.img[0]} alt="" fill sizes="100vw"/>
            </div>
          </div>
          {/* </Link> */}
          </div>
        </div>
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className={styles.right}
        >
          {/* <Link
            href={`/product/${product._id}`}
            passHref
            style={{ textDecoration: "none", color: "#000" }}
          > */}
          <div onClick={()=>router.push(`/product/${product._id}`)}>
            <h1 className={width < 600 ? styles.title_mob : styles.title}>
              {product.title}
            </h1>
            <p className={width < 600 ? styles.desc_mob : styles.desc}>
              {product.desc}
            </p>
            <p className={width < 600 ? styles.price_mob : styles.price}>
              <h2>Rs. {price}/-</h2>
            </p>
            </div>
          <div className={width < 600 ? styles.button_mob : styles.button}>
            {/* <button
              onClick={() => handleClickBuyNow()}
              className={
                width < 600 ? styles.button_buy_mob : styles.button_buy
              }
            >
              BUY NOW
            </button> */}
            <button
              onClick={() => handleClickBuyNow()}
              className={
                width < 600 ? styles.button_cart_mob : styles.button_cart
              }
            >
              <div>
              BUY NOW
                {/* <BiShoppingBag /> */}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
