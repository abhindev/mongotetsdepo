export default async function handler(req, res) {
  const { method } = req;
  // if (method === "GET") {
  //   console.log("get")
  //   console.log(req.headers.verify)
  //   console.log(req.headers.payload)
  //   res.status(200).json(req.headers.verify+req.headers.payload);
  // }
  if (method === "POST") {
    // console.log(req.headers.payload)
    console.log(req.headers.verify)
    const payload = {
        request:`${req.headers.payload}`,
      };
      const headers = {
        "Content-Type": "application/json",
        "X-VERIFY":`${req.headers.verify}`,
        accept: "application/json",
      };
    try {
      const response = await fetch(process.env.PHONEPEURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json();
      res.status(200).json(responseData);
      console.log(responseData);
  
      // console.log(responseData.data.instrumentResponse.redirectInfo.url);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred." + error });
    }
  }
  }
