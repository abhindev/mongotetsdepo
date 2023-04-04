import React, { useState } from 'react'
import styles from ".././../styles/Hamburger.module.css"
function Hamburger(oppen) {
  const [x, setx]=useState(oppen)
  // if (x == true) {
  //   setx(true)
  // }
console.log(x)
  return (
    <div className={styles.Hamburger} 
    style={x!==true?{display:'none'}:{}}
    >
      {x==true ? <>1</> : <>2</>}
    

      <button onClick={()=>setx(false)}>X</button>
    </div>
  )
}

export default Hamburger
