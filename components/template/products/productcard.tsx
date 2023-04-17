import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../../../styles/ProductCard.module.css";
import useDeviceSize from "../../hooks/useWindowSize";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../lib/redux/cartSlice";

function ProductCard({ product, i }: any) {
  const [width, height] = useDeviceSize();
  const [load, setload] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
console.log(product)
  const item = product;
  const index = i;
  const price = item.prices[0].price;
  const off = item.prices[0].off
  const quantity = 1;

  const variant = item.prices[0].text;

  const handleClickBuyNow = () => {
    dispatch(addProduct({ ...product, price, quantity, variant }));
    router.push("/cart");
  };
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
            <a href={`/product/${product._id}`}>
              {/* <div onClick={()=>handleClick() }> */}
              <div className={width < 600 ? styles.img_mob : styles.img}>
                <Image src={product.img[0]} alt="" fill sizes="100vw" />
              </div>
              {/* </div> */}
            </a>
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
          <a
            href={`/product/${product._id}`}
            // passHref
            style={{ textDecoration: "none", color: "#000" }}
          >
            {/* <div onClick={()=>handleClick()}> */}
            <div>
              <h1 className={width < 600 ? styles.title_mob : styles.title}>
                {product.title}
              </h1>
              <p className={width < 600 ? styles.desc_mob : styles.desc}>
                {product.desc}
              </p>
              <div className={styles.off}>

              <del className={styles.del}>{off}</del>
              </div>
              <p className={width < 600 ? styles.price_mob : styles.price}>
                
                <h1 className={styles.ins}>Rs. {price}.00</h1>
                
                
              </p>
            </div>
          </a>

          <div className={width < 600 ? styles.button_mob : styles.button}>
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
