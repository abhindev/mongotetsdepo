export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: "vihara.lifecare@gmail.com",
      password: "POP1@spiderman!",
    });

    var requestOptions = {
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
        res.status(200).json(token);
      })
      .catch((error) =>
        res.status(500).json({ message: "An error occurred." + error })
      );
  }
  if (method === "POST") {
    // console.log("body : "+req.body.order_id)
    // console.log("token: "+req.body.token)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${req.body.token}`);

    var raw = JSON.stringify({
      order_id: req.body.order_id,
      order_date: req.body.order_date ,
      pickup_location: "Vihara",
      channel_id: "3740095",
      comment: "Reseller: vihara",
      billing_customer_name: req.body.billing_customer_name,
      billing_last_name: "",
      billing_address: req.body.billing_address,
      billing_address_2: "",
      billing_city: req.body.billing_city,
      billing_pincode: req.body.billing_pincode,
      billing_state: req.body.billing_state,
      billing_country: "India",
      billing_email: req.body.billing_email,
      billing_phone: req.body.billing_phone,
      shipping_is_billing: true,
      shipping_customer_name: "",
      shipping_last_name: "",
      shipping_address: "",
      shipping_address_2: "",
      shipping_city: "",
      shipping_pincode: "",
      shipping_country: "",
      shipping_state: "",
      shipping_email: "",
      shipping_phone: "",
      order_items: req.body.order_items,
      payment_method: "Prepaid",
      shipping_charges: 0,
      giftwrap_charges: 0,
      transaction_charges: 0,
      total_discount: 0,
      sub_total: req.body.sub_total,
      length: 21.5,
      breadth: 17.5,
      height: 6,
      weight: 0.5,
    });

    var requestOptions = {
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
}
