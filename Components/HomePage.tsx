import React,{FC, useEffect, useState} from 'react';
import{Text,FlatList, StyleSheet, Button,View }from 'react-native';
import StudentListRow from './StudentListRow';
import PostModel,{Post} from '../Model/PostModel';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const HomePage : FC<{navigation:any,route:any}> = ({navigation,route}) => {
  const [data,setData] = useState<Post[]>([]);
  const[currentUser,setCurrentUser] = useState("");
  const onItemSelected = (id:string) =>{
    console.log("Item selected: "+id);
    navigation.navigate('StudentDetailsPage',{id:id});
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
    if(route.params?.user){
      setCurrentUser(route.params.user)
    }
  },[route.params?.user])

  useEffect(()=>{
    navigation.setOptions({
      headerRight: () =>(
        <MaterialCommunityIcons name="account-details" size={44} color="black"
        onPress={() => navigation.navigate('StudentAddPage',{owner:currentUser})} />
      )
    })
  },[])

  return (
    <View style={styles.postPage}>
      <Text style={styles.helloUser}>Hello,{currentUser}</Text>
      <View style={styles.addPost}>
        <Ionicons name="add-circle" 
            size={34} 
            color="black"
            onPress={()=>navigation.navigate('StudentAddPage',{owner:currentUser})}
                  />
      </View>
    <FlatList
      style={styles.flatList}
      data = {data}
      keyExtractor={(post)=>post._id}
      renderItem={({item})=> (
        <StudentListRow
          name={item.owner}
          id={item._id}
          imgUrl={item.postImageUrl}
          content = {item.postText}
          onItemSelected={onItemSelected}
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