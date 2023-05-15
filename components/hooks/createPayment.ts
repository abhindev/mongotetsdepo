import { useState } from "react";
import CryptoJS from 'crypto-js';

interface PaymentDetails {
  order_id: string;
  order_amount: number;
  order_currency: string;
  order_note: string;
  order_meta: {
    return_url: string;
  };
  customer_details: {
    customer_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: number;
  };
}


async function createPayment(
  order_id: string,
  order_amount: number,
  customer_phone: number
): Promise<any> {


  const json = {
    merchantId: process.env.NEXT_PUBLIC_PHONEPE_MID,
    merchantTransactionId: "MT7850590068188104",
    merchantUserId: `00000000000000A`,
    amount: order_amount + "00",
    redirectUrl: "https://webhook.site/redirect-url",
    redirectMode: "POST",
    callbackUrl: "https://webhook.site/callback-url",
    mobileNumber: `${customer_phone}`,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
   const encode = btoa(JSON.stringify(json));
   const key = process.env.NEXT_PUBLIC_PHONEPE_KEY
   const newString = `${encode}/pg/v1/${key}`
   const SHA256 = CryptoJS.SHA256(newString).toString()

   console.log(">>>>>>>>>>>>>>>>>>>.........")
   console.log(encode)
    console.log("--------------------------")
    console.log(SHA256)
    console.log("--------------------------")
   console.log(">>>>>>>>>>>>>>>>>>>.........")
   ////////////////////////////////////////
    // console.log("json::"+json)
    // console.log("encode::"+encode)
    // console.log("sha256::"+SHA256)

  const payload = encode;
  const verify =
    `${SHA256}###1`;
  
console.log(verify);

  const res = await fetch("/api/phonepe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Payload": payload, //encoded json payload
      "Verify": verify, //verifyer
    },
  }).then(response => response.json())
  // .then(data => console.log("hooks"+data.instrumentResponse.redirectInfo.url
  .then(data =>  console.log(data) )
  .catch(error => console.error(error));

  // console.log(res)
  return res;
}

export default createPayment;

//return_url: "https://www.kalyaniammas.com/order/success/{order_id}",
