export default async function handler(req, res) {

    // console.log(req.headers.payload)
    // console.log(req.headers.verify)
    const payload = {
        request:`${req.headers.payload}`,
      };
      const headers = {
        "Content-Type": "application/json",
        "X-VERIFY":`${req.headers.verify}`,
        accept: "application/json",
      };
    try {
      const response = await fetch("https://api.phonepe.com/apis/hermes", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
  
      const responseData = await response.json();
      res.status(200).json(responseData.data);
      console.log(responseData.data);
  
      // console.log(responseData.data.instrumentResponse.redirectInfo.url);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred." + error });
    }
  }
