import mongoose from "mongoose";

interface Address {
  Address: string;
  City: string;
  State: string;
  pinCode: string;
}

interface Order {
  insertedId: any;
  customer: string;
  address: Address;
  phone: string;
  phone2: string;
  item: string;
  total: number;
  status: number;
  method: number;
}

async function createOrder(
  customer: string,
  address: string,
  city: string,
  state: string,
  pinCode: string,
  phone: string,
  phone2: string,
  item: string,
  total: number
): Promise<Order> {
  let Schema = mongoose.Schema
  //get coocki value
  function getCookieValue(cookieName:any) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

// Usage: Pass the name of the cookie you want to retrieve
var loggedinValue = getCookieValue("loggedin");
// console.log(loggedinValue);
//end 
  let costomerID = loggedinValue
  const res = await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id : Schema.Types.ObjectId,
      costomer_id: costomerID,
      customer,
      address: {
        Address: address,
        City: city,
        State: state,
        pinCode: pinCode,
      },
      phone,
      phone2,
      item,
      total,
      status: 0,
      method: 0,
    }),
  });
  return await res.json();
}

export default createOrder;
