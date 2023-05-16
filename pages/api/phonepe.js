// import CryptoJS from "crypto-js";
import { createHash } from "node:crypto";
export default async function handler(req, res) {
  function sha256(content) {
    return createHash("sha256").update(content).digest("hex");
  }
  const { method } = req;
  if (method === "POST") {
    const key = "a528519a-95c1-4cfd-802b-cdacee3a0752";//process.env.PHONEPE_KEY
    const index = 1;//process.env.PHONEPE_INDEX

    const data = {
      merchantId: "KALYANIAMMASONLINE",//process.env.PHONEPE_MID
      merchantTransactionId: "ORDER_"+req.body.merchantTransactionId,
      merchantUserId: req.body.merchantUserId,
      amount: req.body.amount*100,
      redirectUrl: "https://www.kalyaniammas.com/order/success/"+req.body.merchantTransactionId,
      redirectMode: "POST",
      callbackUrl: "https://www.kalyaniammas.com/cart",
      mobileNumber: req.body.mobileNumber,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    // const encodeData= btoa(JSON.stringify(data))
    const encodeData = Buffer.from(JSON.stringify(data)).toString("base64");
    const SHA256 = ""; //CryptoJS.SHA256(encodeData + "/pg/v1/pay" + key).toString();
    const toHash = encodeData + "/pg/v1/pay" + key;
    const hash = sha256(toHash);
    const verify = hash + "###" + index;
    // res.status(200).json(XVERIFY);
    const headers = {
      "Content-Type": "application/json",
      "X-VERIFY": verify,
      accept: "application/json",
    };
    const payload = {
      request: encodeData,
    };
    
    try {
      const response = await fetch("https://api.phonepe.com/apis/hermes/pg/v1/pay", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      res.status(200).json(responseData);
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred." + error });
    }
  }
  // if (method === "POST") {
  //   console.log(req.body)
  //   res.status(200).json(req.body.merchantTransactionId);
  // }
}
