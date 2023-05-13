import React from 'react'
import createPayment from "../components/hooks/createPayment";
import { useRouter } from 'next/router';

function text() {
    const router = useRouter();
   const handleClick=()=>{
    console.log("running")
    const order_id= "123asjhdg43wr"
    const order_amount= 299
    const customer_phone= 62353554432
    createPayment(
        order_id,
        order_amount,
        customer_phone
      ).then(function(res) {
        console.log("page:"+res)
        router.push(res);
        return "normalReturn";
      });
    }
  return (
    <div>
      <button onClick={()=>handleClick()}>button</button>
    </div>
  )
}

export default text






// import React from "react";

// function text() {
//   const payload = {
//     request:
//       "ewogICJtZXJjaGFudElkIjogIlBHVEVTVFBBWVVBVCIsCiAgIm1lcmNoYW50VHJhbnNhY3Rpb25JZCI6ICJNVDc4NTA1OTQ3MzQzMjU1IiwKICAibWVyY2hhbnRVc2VySWQiOiAiTVVJNTc5MjM0MyIsCiAgImFtb3VudCI6IDEwMDAwLAogICJyZWRpcmVjdFVybCI6ICJodHRwczovL3dlYmhvb2suc2l0ZS9yZWRpcmVjdC11cmwiLAogICJyZWRpcmVjdE1vZGUiOiAiUE9TVCIsCiAgImNhbGxiYWNrVXJsIjogImh0dHBzOi8vd2ViaG9vay5zaXRlL2NhbGxiYWNrLXVybCIsCiAgIm1vYmlsZU51bWJlciI6ICI5OTk5OTk5OTk5IiwKICAicGF5bWVudEluc3RydW1lbnQiOiB7CiAgICAidHlwZSI6ICJQQVlfUEFHRSIKICB9Cn0=",
//   };

//   const headers = {
//     "Content-Type": "application/json",
//     "X-VERIFY":
//       "c782a4ec4d848580771ea2bd25134f88d5686fca2277d9e9e95cb0e4fe70187b###1",
//     accept: "application/json",
//   };
//   const handleClick = () => {
//     fetch("https://api-preprod.phonepe.com/apis/merchant-simulator/pg/v1/pay", {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(payload),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((responseData) => {
//         console.log(responseData);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return <div>
//     <button onClick={()=>handleClick()}>butotone</button>
//   </div>;
// }

// export default text;

