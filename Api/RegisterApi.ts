import apiClient from "./ClientApi"


const registerUser = async(firstName:string,lastName:string,email:string,password:string,url:string,age:string,state:string) =>{
    const res:any = await apiClient.post("/auth/register",{firstName:firstName,lastName:lastName,email:email,password:password,userImageUrl:url,userAge:age,userState:state});
    return res;
    
}

export default {registerUser};