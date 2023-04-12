import React, { useState } from 'react'
import upDateUser from "../components/hooks/upDateUser"
import Cookies from 'js-cookie'
function Test() {
  // const [added,setAdded]=useState(true)
  // const order = {item: "bike", price: "ooo"}
  // const phoneNumber = "+916235354432"
  
  // if(added) {
  //   upDateUser(phoneNumber, order)
  //   setAdded(false)
  //   console.log("is runing")
  // }
  let value = Cookies.get("loggedin");

  console.log(value)

  return (
    <div>
      test
    </div>
  )
}

export default Test
