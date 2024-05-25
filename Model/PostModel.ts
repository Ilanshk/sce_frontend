import PostApi from "../Api/PostApi";
import FormData from 'form-data';
import mime from "mime";

export type Post = {
    _id:string,
    postText: string,
    owner:string
    postImageUrl: string,
}


const getAllPosts = async(accessToken:string) =>{
  console.log("get all posts")
  try{
    const responseStudents:any = await PostApi.getAllPosts(accessToken);
    let posts = Array<Post>();
    if(responseStudents.data){
      responseStudents.data.forEach((p:Post)=>{
        const post: Post = {
          _id:p._id,
          postText:p.postText,
          owner:p.owner,
          postImageUrl:p.postImageUrl
        }
        posts.push(post);
      });
    }
    return posts; 
  }catch(err){
    console.log("Failed Reading Posts from server: "+err);
    return Array<Post>();
  }
}


const addPost = async(post:Post) =>{
    console.log('addStudent');
    const data = {
      _id:post._id,
      postText:post.postText,
      owner:post.owner,
      postImageUrl:post.postImageUrl
    }
    try{
      const res = await PostApi.addPost(data);
    }catch(err){
      console.log("add student failed");
    }
}

const updatePost = async(idPost:string,content:string|undefined,image:string|undefined) =>{
  const resUpdatePost = await PostApi.updatePost(idPost,content,image);
  return resUpdatePost;

}

const deletePost = async(id:string)=>{
    try{
      const response = await PostApi.deletePost(id);
      return response;
    }
    catch(error){
      console.log("Error deleting post: "+error);
    }
}

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


export default {getAllPosts,addPost,updatePost,deletePost,uploadImage};