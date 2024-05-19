
import ApiClient from "./ClientApi";

const getUser = async(id:string) =>{
    const res = await ApiClient.get("/user/"+id);
    return res.data;
}

export default {getUser}