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
    merchantId: "KALYANIAMMASONLINE",
    merchantTransactionId: `MT${order_id}`,
    merchantUserId: `${order_id}`,
    amount: order_amount + "00",
    redirectUrl: `https://www.kalyaniammas.com/success/${order_id}`,
    redirectMode: "POST",
    callbackUrl: "https://webhook.site/callback-url",
    mobileNumber: `${customer_phone}`,
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
   const encode = btoa(JSON.stringify(json));
   const key = 'a528519a-95c1-4cfd-802b-cdacee3a0752'
   const newString = `${encode}/pg/v1/${key}`
   const SHA256 = CryptoJS.SHA256(newString).toString()
   ////////////////////////////////////////
    // console.log("json::"+json)
    // console.log("encode::"+encode)
    // console.log("sha256::"+SHA256)

  const payload = encode;
  const verify =
    `${SHA256}###1`;
  
  const res = await fetch("/api/phonepe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      payload: payload, //encoded json payload
      verify: verify, //verifyer
    },
  }).then(response => response.json())
  .then(data => {
    console.log("hooks" + data.instrumentResponse.redirectInfo.url);
    return data.instrumentResponse.redirectInfo.url;
  })
  // .then(data => console.log("hooks"+data.instrumentResponse.redirectInfo.url
  // .then(data =>  console.log(data) )
  .catch(error => console.error(error));

  // console.log(res)
  return res;
}

export default createPayment;

//return_url: "https://www.kalyaniammas.com/order/success/{order_id}",
