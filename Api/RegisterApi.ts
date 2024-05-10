import apiClient from "./ClientApi"


const registerUser = async(email:string,password:string) =>{
    console.log("username: "+email);
    console.log("password: "+password);
    const res:any = await apiClient.post("/auth/register",{email:email,password:password});
    console.log("Server register with email and password:"+res.status);//server has to return tokens
    return res;
    
}

export default {registerUser};