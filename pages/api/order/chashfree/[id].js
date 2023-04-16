export default async function handler(req, res) {
    // Set the request headers
    const {
      query: { id },
    } = req;
  
    const headers = {
      "Content-Type": "application/json",
      "x-api-version": "2022-01-01",
      "x-client-id": '315764e438e7781950770c97a4467513',
      "x-client-secret": '4de62862e69a3713931bfd75910f48d68b533b5c',
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