import { useState } from "react";
import styles from "../../styles/ReviewYt.module.css"
    
function Review() {
    const pins = [
        { id: 1, src: "/kalyaniammas review pics/kalyani ammas review1.webp" ,url:"https://youtube.com/shorts/tIlNPTq2tZM?feature=share"},
        { id: 2, src: "/kalyaniammas review pics/kalyaniammas review2.webp" ,url:"https://youtube.com/shorts/mRE6VwVg3rI?feature=share"},
        { id: 3, src: "/kalyaniammas review pics/kalyaniammas review3.webp" ,url:"https://youtu.be/w5AP6rRoB6U"},
        { id: 4, src: "/kalyaniammas review pics/kalyaniammas review4.webp" ,url:"https://youtu.be/t3Ts2r9XCC8"},
        { id: 5, src: "/kalyaniammas review pics/kalyaniammas review5 .webp", url:"https://youtube.com/shorts/2aBXUiuU4qA?feature=share" },
        { id: 6, src: "/kalyaniammas review pics/kalyaniammas review6.webp" ,url:"https://youtube.com/shorts/hV3YGwDk5bA?feature=share"}
      ];
      const [count ,setCount] = useState(6)
      const viewMore = () => {
        setCount(count+3)
      }

    return (
        <div className={styles.container}>
        <div className={styles.title}>
            <p className={styles.customerText}>Customer </p>
            <p className={styles.ExperienceText}>Experience</p>
        </div>
        <div className={styles.grid}>
        { pins.map((pin,i) => (
          <div key={i} className={styles.pin}>
            <div className={
                i%3 ===0 ? styles.zero : i%3 ===1? styles.one : styles.two
            }> 
            <a href={pin?.url} target="_blank">
                <img src={pin.src} alt=""  className ={styles.image}/>
            </a>
                {/* <iframe width="100" height="200" src="https://www.youtube.com/embed/Q6zsaJRNCOw" className ={styles.image} ></iframe> */}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttoncontainer}>
      <div className={styles.button} >
        <a href="https://www.youtube.com/@dailyhealth_malayalam/videos" target="_blank" style={{color:"#fff", fontSize:"10px"}} >
        Show More
        </a>
        </div>
      </div>
      </div>
    )
   }

export default Review;
