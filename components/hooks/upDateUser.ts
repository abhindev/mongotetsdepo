

  async function upDateUser(phoneNumber: string, order: object){
    
   
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
      
      return await res.json();
  }
  
  export default upDateUser;
  

