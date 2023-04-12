import { useState } from "react";
import styles from "../../styles/ReviewYt.module.css"
    
function Review() {
    const pins = [
        { id: 1, src: "https://picsum.photos/100/200" ,url:"https://youtu.be/bwTlcN1tnY0"},
        { id: 2,  width:"100", height:"200" ,src:"https://www.youtube.com/embed/bwTlcN1tnY0", title:"YouTube video player" ,frameborder:"0", allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"},
        { id: 8, src: "https://picsum.photos/100/200" },
        { id: 3, src: "https://picsum.photos/100/200" },
        { id: 4, src: "https://picsum.photos/100/200" },
        { id: 9, src: "https://picsum.photos/100/200" },
        { id: 5, src: "https://picsum.photos/100/200" },
        { id: 6, src: "https://picsum.photos/100/200" },
        { id: 7, src: "https://picsum.photos/100/200" },
      ];
      const [count ,setCount] = useState(6)
      const viewMore = () => {
        setCount(count+3)
      }

    return (
        <>
        {}
        
        <div className={styles.title}>
            <p className={styles.customerText}>Customer </p>
            <p className={styles.ExperienceText}>Experience</p>
        </div>
        <div className={styles.grid}>
        { pins.slice(0, count).map((pin,i) => (
          <div key={i} className={styles.pin}>
            <div className={
                i%3 ===0 ? styles.zero : i%3 ===1? styles.one : styles.two
            }> 
                {/* <img src={pin.src} alt=""  className ={styles.image}/> */}
                <iframe width="100" height="200" src="https://www.youtube.com/embed/bwTlcN1tnY0" className ={styles.image} ></iframe>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttoncontainer}>
      <div className={styles.button} onClick={()=>viewMore()}>Show More</div>
      </div>
      </>
    )
   }

export default Review;