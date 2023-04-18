export default async function handler(req, res) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
          email: "vihara.lifecare@gmail.com",
          password: "POP1@spiderman!",
        });
    
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
    
        fetch("https://apiv2.shiprocket.in/v1/external/auth/login", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            const data = { result };
    
            const parsedData = JSON.parse(data.result); // Parse the "result" value as JSON
            const token = parsedData.token; // Access the "token" value
            res.status(200).json({ message: "error occurred." + token });
          })
          .catch((error) => res.status(500).json({ message: "An error occurred." + error }));

}