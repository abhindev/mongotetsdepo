import React from "react";
import createOrder from "../../components/hooks/createOredr";
import createPayment from "../../components/hooks/createPayment"
function index() {
  const handillick = () => {
    const res = createOrder(
      "customer",
      "address",
      "city",
      "state",
      "pinCode",
      "phone",
      "phone2",
      "item",
      10
    ).then(function (result) {
      console.log(result.insertedId);
    });
  };
  const payLink=()=>{
    const res = createPayment(
        "oredr_4826527462dhsgmg",
      10,
      "customer_2547sagh2376ed",
      "customer_name",
      "abhindev4432@gmail.com",
      "6235354432"
    )
  }


  return (
    <div>
      ordeeer index
      <button onClick={() => handillick()}>place order</button>
      <button onClick={() => payLink()}>py</button>
    </div>
  );
}

export default index;
