import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Image from "next/image";
import styles from "../../../styles/Order.module.css";
import { useRouter } from 'next/router'

function OrderItem({ order }: any) {
  const [token, setToken] = useState();
  const [showId, setShowId] = useState(false);
  const [track_url, setTrack_url] = useState();
  const [remove, setRemove] = useState(false);
  const [message, setMessage] = useState();
  //   const []
  const router = useRouter()
  //   GET AUTH

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/shiprocket");
      const jsonData = await response.json();
      setToken(jsonData);
    };

    if (token === undefined) {
      fetchData();
    }
  }, [token]);
  // GET TRACK
  if (order && token !== undefined && track_url == undefined) {
    (async () => {
      const data = {
        token: token,
        trackingID: order?.tracking_id,
      };
      const response = await fetch("/api/shiprocket/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonData = await response.json();
      const trackData = JSON.parse(jsonData);
      const url = trackData;
      setTrack_url(url);
    })();
  }
  //  DELETE ORDER
  //stage-1
  const [conform, setConform] = useState(false);

  async function handleClickCancel() {
    const data = {
      token: token,
      trackingID: order?.tracking_id,
    };
    const response = await fetch("/api/shiprocket/track", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonData = await response.json();
      const trackData = JSON.parse(jsonData);
      const url = trackData;
      setMessage(url)
      router.push("/")
  }
  // DELETE EMPTY ORDER

  const handleDelete = () => {
    setRemove(true);
    fetch("/api/order", {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((result) => console.log("error"))
      .catch((error) => console.log("error"));
  };
  if (remove == false) {
    handleDelete();
  }

  const [conformModelShow, setConformModelShow] = useState(false);

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
      borderColor: "transparent",
    },
  };

  return (
    <>
    {/* <div>{message}</div> */}
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
                  Oder ID : {order.tracking_id}
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
            <div className={styles.Pricecontainer}>
              <p style={{ fontWeight: 10 }}>₹{order.total}.00</p>
            </div>
          </div>
          <div className={styles.btncontainer}>
            <a
              className={styles.btn}
              href={track_url}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <div className={styles.btn}> Track</div>
            </a>
            <div
              className={styles.btn}
              onClick={() => setConformModelShow(true)}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Line}></div>

      {conformModelShow ? (
        <>
          <Modal
            isOpen={conformModelShow}
            onRequestClose={() => setConformModelShow(false)}
            style={customStyles}
          >
            <div className={styles.cancelBtnC}>
              <button
                className={styles.cancelBtn}
                onClick={() => handleClickCancel()}
              >
                conform
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setConformModelShow(false)}
              >
                close
              </button>
            </div>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default OrderItem;
