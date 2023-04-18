export default async function handler(req, res) {
    // Set the request headers
    const {
      query: { id },
    } = req;
  
    const headers = {
      "Content-Type": "application/json",
      "x-api-version": "2022-01-01",
      "x-client-id": 'TEST3691828b4e22dca122faea8649281963',
      "x-client-secret": 'TEST7d7f0d5a1bc6a0006d8d5fcb9c06c561c86df2f4',
    };
  
    try {
      // Make the GET request
      const response = await fetch(`${process.env.NEXT_PUBLIC_CASHFREE_URI}/${id}`, {
        method: 'GET',
        headers,
      });
  
      // Get the response data
      const data = await response.json();
  
      // Send the response back to the client
      res.status(200).json({ data });
      // console.log(data);
    } catch (error) {
      // Handle errors
      res.status(500).json({ error: 'Error fetching data' });
    }
  }