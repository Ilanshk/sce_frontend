import React,{FC, useEffect, useState} from 'react';
import{Text,FlatList, StyleSheet, Button,View }from 'react-native';
import PostListRow from './PostListRow';
import PostModel,{Post} from '../Model/PostModel';
import userModel from '../Model/userModel';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const HomePage : FC<{navigation:any,route:any}> = ({navigation,route}) => {
  const [data,setData] = useState<Post[]>([]);
  const[currentUser,setCurrentUser] = useState("");
  const onItemSelected = (id:string) =>{
    console.log("Item selected: "+id);
    
  }
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus',async()=>{
      console.log("screen in focus");
      try{
        const posts = await PostModel.getAllPosts(route.params.accessToken);
        setData(posts)
      }catch(err){
        console.log("Failed to read Students from Server: "+err);
        setData(Array<Post>())
      }
    })
    return unsubscribe;
  },[navigation])

  useEffect(()=>{
    if(route.params?.userName){
      setCurrentUser(route.params.userName)
    }
  },[route.params?.userName])


  useEffect(()=>{
    navigation.setOptions({
      headerRight: () =>(
        <MaterialCommunityIcons name="account-details" size={44} color="black"
        onPress={() => navigation.navigate('ProfilePage',{id:route.params.userId,userName:route.params.userName,accessToken:route.params.accessToken})} />
      )
    })
  },[])

  const getOwnerName = async(userId:string) =>{
    try{
      const res:any = await userModel.getUserById(userId);
      return res.firstName + " " + res.lastName;
    }catch(error){
      console.log("Error in getting user's full name: "+error)
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


  return (
    <View style={styles.postPage}>
      <Text style={styles.helloUser}>Hello,{currentUser}</Text>
      <View style={styles.addPost}>
        <Ionicons name="add-circle" 
            size={34} 
            color="black"
            onPress={()=>navigation.navigate('PostAddPage',{owner:currentUser})}
        />
      </View>
    <FlatList
      style={styles.flatList}
      data = {data}
      keyExtractor={(post)=>post._id}
      renderItem={({item})=> (
        <PostListRow
          idPostOwner={item.owner}
          idPost={item._id}
          imgUrl={item.postImageUrl}
          content = {item.postText}
          getFullName={getOwnerName}
          getUserImgUrl = {getUserProfileImgUrl}
          setUserPosts = {setData}
          isHomePage = {true}
          isUserPostsPage = {false}
          accessToken={route.params.accessToken}
        />    
      )}
    ></FlatList>
  </View>
  )
}


const styles = StyleSheet.create({
  postPage:{
    flex:1
  },
  helloUser:{
    fontSize:20,
  },
  addPost:{
    marginStart:370,
    margin:10
  },
    flatList:{
        //flex:1
    }
});
export default HomePage;