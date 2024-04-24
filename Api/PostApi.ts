import ApiClient from "./ClientApi"
//This file includes all the requests we send to the server
const getAllPosts = () =>{
    return ApiClient.get("/post");
}

const getPostById = (id:string) =>{
    return ApiClient.get("/post/"+id);
}

export default{getAllPosts,getPostById};