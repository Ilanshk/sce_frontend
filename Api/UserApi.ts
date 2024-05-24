
import ApiClient from "./ClientApi";

const getUser = async(id:string) =>{
    const getResponse = await ApiClient.get("/user/"+id);
    return getResponse.data;
}

const updateUser = async(id:string,age?:string,country?:string) =>{
    const updateResponse = await ApiClient.put("/user/"+id,{userAge:age,userCountry:country});
}

const logOutUser = async(refreshToken:string)=>{
    ApiClient.setHeaders({'authorization':'bearer ' +refreshToken});
    const res = await ApiClient.get("/auth/logout");
    console.log("LOG OUT RESPONSE: "+res.data);
}

export default {getUser,updateUser,logOutUser}