import React, { useState } from "react";
import Modal from "react-modal";
import Image from "next/image";
import styles from "../../../styles/Order.module.css";
function OrderItem({ order }: any) {
  console.log(order);
  const [showId, setShowId] = useState(false);
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(67, 67, 67, 0.074)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <>
      <div className={styles.section}>
        <div className={styles.imagecontainer}>
          <Image
            src={order.item.products[0].img[0]}
            alt=""
            width={110}
            height={110}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
          <div className={styles.nonimage}>
            <div className={styles.IDcontainer}>
              <div className={styles.wrapper}>
                <p className={styles.demo_2} onClick={() => setShowId(true)}>
                  Oder ID : {order._id}
                </p>
                <Modal
                  isOpen={showId}
                  onRequestClose={() => setShowId(false)}
                  style={customStyles}
                >
                  Oder ID :{order._id}
                </Modal>
              </div>
            </div>
            <div className={styles.Pricecontainer}>{order.total}</div>
          </div>
          <div className={styles.btncontainer}>
            <div className={styles.btn}>Track</div>
            <div className={styles.btn}>Cancel</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderItem;
