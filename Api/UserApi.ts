
import ApiClient from "./ClientApi";

const getUser = async(id:string) =>{
    const getResponse = await ApiClient.get("/user/"+id);
    return getResponse.data;
}

const updateUser = async(id:string,age?:string,country?:string) =>{
    const updateResponse = await ApiClient.put("/user/"+id,{userAge:age,userCountry:country});
}

export default {getUser,updateUser}