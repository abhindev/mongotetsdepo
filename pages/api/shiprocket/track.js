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
      `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${req.body.trackingID}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) =>  res.status(200).json(result))
      .catch((error) => console.log("error", error));
  }
}
