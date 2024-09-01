
import ApiClient from "./ClientApi"


const uploadImage = async (image:any) =>{
    const res= await ApiClient.post("/file/file",image,{headers:{"Content-Type":'multipart/form-data'}});
    return res;
}

export default{uploadImage};