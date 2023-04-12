import clientPromise from "../../lib/mongodb"

  async function upDateUser(phoneNumber: string, order: object){
    console.log("phoneNumber"+phoneNumber)
    console.log(order+" order")
    const newFieldValue = order
    const res = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          newFieldValue
        })
      })
      console.log("added")
      return await res.json();
  }
  
  export default upDateUser;
  

