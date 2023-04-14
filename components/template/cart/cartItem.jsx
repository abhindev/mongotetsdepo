import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/CartItem.module.css";
import {
  addQuantity,
  removeQuantity,
  removeItem,
} from "../../../lib/redux/cartSlice";
import { RxCross2, RxDash,RxPlus } from "react-icons/rx";

function CartItem({ cart }) {
  const cartItem = useSelector((state) => state.cart.products);
  console.log(cartItem);
  const dispatch = useDispatch();

  var cartItems = [];

  cart.products.map((product) => {
    cartItems.push(product);
  });
  const handleAddQty = (i, product) => {
    dispatch(addQuantity({ i, product }));
  };
  const handleRemoveQty = (i, product) => {
    dispatch(removeQuantity({ i, product }));
  };
  const handleRemove = (i, product, cartItem) => {
    dispatch(removeItem({ i, product, cartItem }));
  };

  return (
    <div>
      <div>
        {cartItems.map((product, i) => (
          <div key={i} className={styles.container}>
            <div key={product._id} className={styles.cartItem}>
              <div className={styles.image}>
                <Image src={product.img[0]} alt="" width="100" height="100" />
              </div>
              <div className={styles.textcont}>
                <span className={styles.name}>
                  {product.title} <br /> {product.variant}
                </span>
                <span className={styles.price}>₹{product.price}</span>
              </div>
              <div>
                
                  <RxCross2 className={styles.icon_x} onClick={(e) => {
                    handleRemove(i, product, cartItem);
                  }}/>
                
                <div className={styles.quantity}>
                  <button
                    className={styles.btn}
                    onClick={(e) => {
                      product.quantity > 1 ? handleRemoveQty(i, product) : null;
                    }}
                  >
                    <RxDash className={styles.icon_remove} />
                  </button>
                  <span className={styles.span}>{product.quantity}</span>
                  <button
                    className={styles.btn}
                    onClick={(e) => {
                      handleAddQty(i, product);
                    }}
                  >
                    <RxPlus className={styles.icon_add} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItem;
