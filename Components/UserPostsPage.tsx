import { FC, useState,useEffect } from "react";
import { View,Text, FlatList,StyleSheet,StatusBar } from "react-native";
import PostModel, { Post } from "../Model/PostModel";
import PostListRow from "./PostListRow";
import userModel from "../Model/userModel";



const UserPostsPage:FC<{navigation:any,route:any}> = ({navigation,route}) =>{
    const [userPosts,setUserPosts] = useState<Post[]>([]);

    useEffect(()=>{
        const fetchPostsOfUser = async() =>{
            try{
                const posts:any = await PostModel.getAllPosts(route.params.accessToken);
                console.log("Posts:",posts);
                const filterdPosts:Post[] = posts.filter((post: Post) => post.owner == route.params.userId)
                setUserPosts(filterdPosts);
            }catch(error){
                console.log("Error in getting user's posts: "+error);  
            }
        }
        fetchPostsOfUser();
        console.log(userPosts);
        
    },[route.params.userId])

    const getFullName = async(id:string) =>{
        try{
            const response:any = await userModel.getUserById(route.params.userId);
            return response.firstName + " " + response.lastName;
        }catch(error){
            console.log("Error in getting posts of the user: "+error);   
        }
    }
    const getUserProfileImgUrl = async(userId: string) =>{
        try{
          const user = await userModel.getUserById(userId);
          return user.userImageUrl;
        }catch(error){
          console.log("Error retrieving user by id: "+error);
        }
      }
   
    return(
        <View style={styles.userPosts}>
            <Text style={styles.helloMessage}>Hi,{route.params.userName}</Text>
            <Text>Here you can see all your posts</Text>
            {userPosts.length!=0? <FlatList
                data={userPosts}
                keyExtractor={(post)=> post._id}
                renderItem={({item})=>
                    <PostListRow
                    idPostOwner={item.owner}
                    idPost={item._id}
                    imgUrl={item.postImageUrl}
                    content = {item.postText}
                    // onItemSelected={route.params.onItemSelected}
                    getFullName={getFullName}
                    getUserImgUrl={getUserProfileImgUrl}
                    isHomePage={false}
                    isUserPostsPage={true}
                    ></PostListRow>
                }
                />
                :<Text>You don't have posts yet</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    userPosts:{
        marginTop:StatusBar.currentHeight,
        marginHorizontal:5,
        alignItems:'center'
    },
    helloMessage:{
        fontSize:25
    }

})

export default UserPostsPage;