export default async function handler(req, res) {
  const { method } = req;

//   console.log("track id ::::::::"+req.body.token)
  if (method === "POST") {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${req.body.token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      // `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${req.body.trackingID}`,
      `https://apiv2.shiprocket.in/v1/external/orders/show/${req.body.trackingID}`,
      // `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/336502422`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>  res.status(200).json(result))
      .catch((error) => console.log("error", error));
  }
  if(method == "DELETE"){

      console.log("tracking ID ::" +req.body.trackingID)
      console.log("token ::"+req.body.token)
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${req.body.token}`);
  
      var raw = JSON.stringify({
        ids: [req.body.trackingID],
      });
  
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch(
        "https://apiv2.shiprocket.in/v1/external/orders/cancel",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(400).json(error));
    };
    if (method == "PUT") {
      console.log(req.body.awb+"awb")
      var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${req.body.token}`);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${req.body.awb}`,
     requestOptions
    )
      .then((response) => response.text())
      .then((result) =>  res.status(200).json(result))
      .catch((error) => console.log("error", error))
    }

}
