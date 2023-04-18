export default async function handler(req, res) {
    try {
      const response = await fetch("https://api.cashfree.com/pg", {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2022-01-01",
          "x-client-id": "TEST3691828b4e22dca122faea8649281963",
          "x-client-secret": "TEST7d7f0d5a1bc6a0006d8d5fcb9c06c561c86df2f4",
        },
      });
  
      const responseData = await response.json();
      res.status(response.status).json(responseData);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "An error occurred." + error });
    }
  }
  