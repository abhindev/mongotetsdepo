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
  const res = await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
