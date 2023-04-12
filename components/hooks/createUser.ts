import clientPromise from "../../lib/mongodb"
  async function createuser(data:any){

    // const client = await clientPromise;
    // const db = client.db();
    // const userData = await db.collection("users").find({ "phoneNumber": data.phoneNumber }).toArray();
    // console.log(userData);
    // const userd = db.collection("users").find({"phoneNumber":data.phoneNumber})
    // console.log(userd)
    const user = {
        uid: data.uid, 
        phoneNumber: data.phoneNumber,
    }
    console.log(user)
    // db.collection("users").find({})
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user
      }),
    });
    return await res.json();
  }
  
  export default createuser;
  
