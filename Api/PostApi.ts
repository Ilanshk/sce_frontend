import { Student } from "../Model/PostModel";
import ApiClient from "./ClientApi"
//This file includes all the requests we send to the server
const getAllStudents = async() =>{
    //console.log("PostApi.ts");
    
    const loginResponse = await ApiClient.post("/auth/login",{email:"bob@gmail.com",password:"123456"});
    const tokens = loginResponse.data as {accessToken:string,refreshToken:string}
    //console.log("Tokens:",tokens);
    
    ApiClient.setHeader('Authorization',`Bearer ${tokens.accessToken}`);
    const res = await ApiClient.get("/student")
    //console.log("Response: ",res);
    return res;
    
    
    
}

const getStudentById = (id:string) =>{
    return ApiClient.get("/student/"+id);
}

const addStudent = async(studentJson:Student) =>{
    return await ApiClient.post("/student",studentJson)
}

const uploadImage = async (image:any) =>{
    console.log("Calling to server with parameter: "+image);
    const res= await ApiClient.post("/file/file",image,{headers:{"Content-Type":'multipart/form-data'}});
    console.log("Server response: ",res.data);
    return res;
    

}

export default{getAllStudents,getStudentById,addStudent,uploadImage};