import apiClient from "./ClientApi"


const registerUser = async(email:string,password:string,url:string,age:string,state:string) =>{
    console.log("username: "+email);
    console.log("password: "+password);
    console.log("age: " +age);
    console.log("state: " +state);
    console.log("url: " +url);
    
    const res:any = await apiClient.post("/auth/register",{email:email,password:password,userImageUrl:url,userAge:age,userState:state});
    console.log("Server register with email and password:"+res.data);//server has to return tokens
    return res;
    
}

export default {registerUser};