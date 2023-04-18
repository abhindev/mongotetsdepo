import React, { useState } from "react";

function test() {
  const [token, setToken] = useState("");
  if (!token) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: "vihara.lifecare@gmail.com",
      password: "POP1@spiderman!",
    });

    var requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://apiv2.shiprocket.in/v1/external/auth/login", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const data = { result };

        const parsedData = JSON.parse(data.result); // Parse the "result" value as JSON
        const token = parsedData.token; // Access the "token" value
        setToken(token);
      })
      .catch((error) => console.log("error", error));
  }
  console.log(token);
  // create shiprocket

  if ( token ) {
    console.log("running")
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify(
    {
      "order_id": "2242343545447",
      "order_date": "2023-04-16 11:11",
      "pickup_location": "Vihara",
      "channel_id": "3740095",
      "comment": "Reseller: M/s Goku",
      "billing_customer_name": "appu",
      "billing_last_name": "Uzumaki",
      "billing_address": "House 221B, Leaf Village",
      "billing_address_2": "Near Hokage House",
      "billing_city": "New Delhi",
      "billing_pincode": "110002",
      "billing_state": "Delhi",
      "billing_country": "India",
      "billing_email": "naruto@uzumaki.com",
      "billing_phone": "9876543210",
      "shipping_is_billing": true,
      "shipping_customer_name": "",
      "shipping_last_name": "",
      "shipping_address": "",
      "shipping_address_2": "",
      "shipping_city": "",
      "shipping_pincode": "",
      "shipping_country": "",
      "shipping_state": "",
      "shipping_email": "",
      "shipping_phone": "",
      "order_items": [
        {
          "name": "Kunai",
          "sku": "chakra123",
          "units": 10,
          "selling_price": "900",
          "discount": "",
          "tax": "",
          "hsn": 441122
        }
      ],
      "payment_method": "Prepaid",
      "shipping_charges": 0,
      "giftwrap_charges": 0,
      "transaction_charges": 0,
      "total_discount": 0,
      "sub_total": 9000,
      "length": 10,
      "breadth": 15,
      "height": 20,
      "weight": 2.5
    }
    
  );

  var requestOptions:any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  }
  return <div>{token}</div>;
}

export default test;
