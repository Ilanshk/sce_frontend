import apiClient from "./ClientApi"


const loginWithEmailAndPassword = async(email:string,password:string) =>{
    const res:any = await apiClient.post("/auth/login",{email:email,password:password});
    return res;
    
}

export default {loginWithEmailAndPassword};