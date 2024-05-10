import apiClient from "./ClientApi"

const loginWithGoogle = async(token:string|null) =>{
    const loginResponse:any = await apiClient.post("/auth/google",{token:token});
    console.log("Server login response: "+loginResponse.data.userTokens);
    return loginResponse;
    
}
const loginWithEmailAndPassword = async(email:string,password:string) =>{
    console.log("username: "+email);
    console.log("password: "+password);
    const res:any = await apiClient.post("/auth/login",{email:email,password:password});
    console.log("Server login with email and password:"+res.data.accessToken);//server has to return tokens
    return res;
    
}

export default {loginWithGoogle,loginWithEmailAndPassword};