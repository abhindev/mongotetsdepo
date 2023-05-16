// import { useState } from "react";

// interface PaymentDetails {
//   order_id: string;
//   order_amount: number;
//   order_currency: string;
//   order_note: string;
//   order_meta: {
//     return_url: string;
//   };
//   customer_details: {
//     customer_id: string;
//     customer_name: string;
//     customer_email: string;
//     customer_phone: number;
//   };
// }

// async function createPayment(
//   order_id: string,
//   order_amount: number,
//   customer_phone: number,
//   customer_id:string
// ): Promise<any> {

//   const data = {
//     merchantTransactionId: order_id,
//     merchantUserId: customer_id,
//     amount: order_amount,
//     mobileNumber: customer_phone,
//   };

//   const res = await
//     fetch("/api/phonepe", {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: "jay"
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
//   return res;
// }

// export default createPayment;

// //return_url: "https://www.kalyaniammas.com/order/success/{order_id}",

async function createPayment(
  order_id : string,
  order_amount :number,
  customer_phone : string,
) {

  // const order_amountNUM = parseInt(order_amount)

  // console.log(order_amount+"type" + typeof order_amount)
  // console.log(order_amountNUM+"type" + typeof order_amountNUM )
  const res = await fetch("/api/phonepe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      merchantTransactionId: order_id,
      merchantUserId: `USER_${order_id}`,
      amount: order_amount,
      mobileNumber: customer_phone,
    }),
  })
    .then((response) => response.json())
    // .then((data) => console.log(data))
    .catch((error) => {
      console.log(error);
    });
  return res;
// console.log(res)
}

export default createPayment;
