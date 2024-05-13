import apiClient from "./ClientApi"


const registerUser = async(email:string,password:string,url:string) =>{
    console.log("username: "+email);
    console.log("password: "+password);
    const res:any = await apiClient.post("/auth/register",{email:email,password:password,userImageUrl:url});
    console.log("Server register with email and password:"+res.data);//server has to return tokens
    return res;
    
}

export default {registerUser};