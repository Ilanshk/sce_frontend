import { Post } from "../Model/PostModel";
import ApiClient from "./ClientApi"
//This file includes all the requests we send to the server
const getAllPosts = async(accessToken:string) =>{
    //console.log("PostApi.ts");
    
    //const loginResponse = await ApiClient.post("/auth/login",{email:"bob@gmail.com",password:"123456"});
    //const tokens = loginResponse.data as {accessToken:string,refreshToken:string}
    console.log("Token for getting all students:",accessToken);
    
    ApiClient.setHeaders({'authorization':'bearer ' +accessToken})
    const res = await ApiClient.get("/post/") //,{headers:{'authorization': 'Bearer '+accessToken}}
    console.log("Response: ",res);
    return res;
    
    
    
}

const getStudentById = (id:string) =>{
    return ApiClient.get("/student/"+id);
}

const addPost = async(postJson:Post) =>{
    return await ApiClient.post("/post",postJson);
}

const uploadImage = async (image:any) =>{
    console.log("Calling to server with parameter: "+image);
    const res= await ApiClient.post("/file/file",image,{headers:{"Content-Type":'multipart/form-data'}});
    console.log("Server response-url for image uploaded: ",res.data);
    return res;
    

}

const deletePost = async (postId:string) =>{
    const deleteResponse = await ApiClient.delete("/post",{id:postId});
    return deleteResponse;
}

export default{getAllPosts,getStudentById,addPost,uploadImage,deletePost};