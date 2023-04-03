// import styles from "../../styles/Featured.module.css";
// import Image from "next/legacy/image";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// import { useState } from "react";

// const Featured = () => {
//   const [index, setIndex] = useState(0);
//   const images = ["/hero/web home3.webp", "/hero/web home.webp", "/hero/hompaage 2.webp"];

//   const handleArrow = (direction:any) => {
//     if (direction === "l") {
//       setIndex(index !== 0 ? index - 1 : 2);
//     }
//     if (direction === "r") {
//       setIndex(index !== 2 ? index + 1 : 0);
//     }
//   };

//   return (
//     <div className={styles.outer}>
//       <div className={styles.container}>
//       <div
//         className={styles.arrowContainer}
//         style={{ left: 0 }}
//         onClick={() => handleArrow("l")}
//       >
//         <div className={styles.arrowleft}>
//           <IoIosArrowBack />
//           </div>
//       </div>
//       <div
//         className={styles.wrapper}
//         style={{ transform: `translateX(${-100 * index}vw)` }}
//       >
//         {images.map((img, i) => (
//           <div className={styles.imgContainer} key={i}>
          
//             <Image src={img} alt="" layout="fill"/>
//             </div>
       
//         ))}
//       </div>
//       <div
//         className={styles.arrowContainer}
//         style={{ right: 0 }}
//         onClick={() => handleArrow("r")}
//       >
//         <div className={styles.arrowright}>
//       <IoIosArrowForward />
//         </div>
//       </div>
//     </div>
//     </div>


//   );
// };

// export default Featured;


import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../../styles/Featured.module.css"
interface Props {
  imageArray: string[];
}

const Featured: React.FC<Props> = () => {  
  const imageArray = ["/hero/web home3.webp", "/hero/web home.webp", "/hero/hompaage 2.webp"];
  return (
    <Carousel autoPlay interval={4000} transitionTime={1000} infiniteLoop showThumbs={false}>
      {imageArray.map((image, i) => (
        <div key={i}>
          <img src={image} alt="" />
        </div>
      ))}
    </Carousel>
  );
};

export default Featured;
