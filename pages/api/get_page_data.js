export default async function handler(req, res) {
    try {
      const response = await fetch(process.env.CASHFREE_URL, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-01-01",
          "x-client-id": process.env.CASHFREE_CLIENT_ID,
          "x-client-secret": process.env.CASHFREE_CLIENT_SECRET,
        },
      });
  
      const responseData = await response.json();
      res.status(response.status).json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred." + error });
    }
  }
  