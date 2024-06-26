import React,{FC, useEffect, useState} from 'react';
import{Text,FlatList, StyleSheet,View,ActivityIndicator }from 'react-native';
import PostListRow from './PostListRow';
import PostModel,{Post} from '../Model/PostModel';
import userModel from '../Model/userModel';
import { Ionicons } from '@expo/vector-icons';
import HeaderOprtions from '../Components/Menu';
import UserApi from '../Api/UserApi';



const HomePage : FC<{navigation:any,route:any}> = ({navigation,route}) => {
  const [data,setData] = useState<Post[]>([]);
  const[currentUser,setCurrentUser] = useState("");
  const[dispalyActivityIndicator,setDisplayActivityIndicator] = useState(true);
  
  const onItemSelected = (id:string) =>{
    console.log("Item selected: "+id);
    
  }
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus',async()=>{
      console.log("screen in focus");
      try{
        const posts = await PostModel.getAllPosts(route.params.refreshToken);
        setData(posts);
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
          <HeaderOprtions
            navigateToProfile= {()=> navigation.navigate('ProfilePage',{id:route.params.userId,userName:route.params.userName,accessToken:route.params.accessToken,refreshToken:route.params.refreshToken,photo:route.params.photo})}
            logOutOfApp={()=>{
              UserApi.logOutUser(route.params.refreshToken);
              navigation.navigate('LogInPage');

            }
            } 
            navigateToHome={()=>{}}
          />
      ),
      
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

  setTimeout(()=> setDisplayActivityIndicator(false),2000);
  return (
    <View style={styles.postPage}>
      {!dispalyActivityIndicator?
      <View style={styles.postPage}>
        <View style={styles.heading}>
          <Text style={styles.helloUser}>Welcome,{currentUser}</Text>
        </View>
        <View style={styles.addPost}>
          <Text style={{fontSize:20}}>What do you want to share today?</Text>
          <Ionicons name="add-circle" 
              size={34} 
              color="blue"
              onPress={()=>navigation.navigate('PostAddPage',{owner:currentUser,accessToken:route.params.accessToken,refreshToken:route.params.refreshToken})}
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
            accessToken={route.params.refreshToken}
          />    
        )}
      ></FlatList>
      </View>
      :<View style={styles.activityIndicator}><ActivityIndicator size={100}/></View>
  }
  </View>
  
  )
}


const styles = StyleSheet.create({
  postPage:{
    flex:1,
  },
  heading:{
    alignItems:'center',
    
  },
  helloUser:{
    fontSize:30,
    fontWeight:'800'
    
  },
  addPost:{
    flexDirection:'row',
    alignItems:'center',
    margin:10,
    justifyContent:'space-between'
  },
  flatList:{
    //flex:1
    
  },
  activityIndicator:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  }
});
export default HomePage;