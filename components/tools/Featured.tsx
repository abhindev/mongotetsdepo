import styles from "../../styles/Featured.module.css";
import Image from "next/legacy/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { useState } from "react";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = ["/img1.jpeg", "/img1.jpeg", "/img1.jpeg"];

  const handleArrow = (direction:any) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <div className={styles.arrowleft}>
          <IoIosArrowBack />
          </div>
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectFit="cover" />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <div className={styles.arrowright}>
      <IoIosArrowForward />
        </div>
      </div>
    </div>
    </div>


  );
};

export default Featured;