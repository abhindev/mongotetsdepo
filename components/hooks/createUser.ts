
  async function Createuser(data:any){

    
    const user = {
        uid: data.uid, 
        phoneNumber: data.phoneNumber,
    }
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user
      }),
    });
    return await res.json();
  }
  
  export default Createuser;
  
