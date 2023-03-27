import React from "react";
import createOrder from "../../components/hooks/createOredr";

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
  return (
    <div>
      ordeeer index
      <button onClick={() => handillick()}>place order</button>
    </div>
  );
}

export default index;
