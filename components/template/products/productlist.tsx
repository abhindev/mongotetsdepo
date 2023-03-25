import React from 'react'
import ProductCard from "./productcard";
import styles from "../../.././styles/ProductList.module.css";
import useDeviceSize from "../../hooks/useWindowSize";



function PoductList({products}:any) {
  const [width, height] = useDeviceSize();
  console.log(width, height);
  
  return (
    <div className={width < 600 ? styles.main : ""}>
      <div className={width < 600 ? styles.grid_container : ''}>
        {products.map((product:any, i:number)=> (
          <div key={i} className={width < 600 ? styles.grid_item : ''}>
            <ProductCard key={i} product={product} i={i}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PoductList
