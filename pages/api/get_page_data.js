export default async function handler(req, res) {
    try {
      const response = await fetch(process.env.CASHFREE_URL, {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-01-01",
          "x-client-id": '315764e438e7781950770c97a4467513',
          "x-client-secret": '4de62862e69a3713931bfd75910f48d68b533b5c',
        },
      });
  
      const responseData = await response.json();
      res.status(response.status).json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred." + error });
    }
  }
  