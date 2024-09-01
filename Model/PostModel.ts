import PostApi from "../Api/PostApi";
import FormData from 'form-data';
import mime from "mime";


const uploadImage = async(imageUri:string) =>{
  let body = new FormData();
  
  body.append('file', 
    {name:'file',
    type:mime.getType(imageUri),
    uri:imageUri });
  try{
    const res = await PostApi.uploadImage(body);
    if(!res.ok){
      console.log("save failed " + res.problem);
    }else{
      if(res.data){
        const d:any = res.data;
        return d.url;
      }
    }
  }catch(err){
    console.log("save failed with error: " + err);
  }
  return "";
}


export default {uploadImage};