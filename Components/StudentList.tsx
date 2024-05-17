import React,{FC, useEffect, useState} from 'react';
import{Text,FlatList, StyleSheet, Button,View }from 'react-native';
import StudentListRow from './StudentListRow';
import StudentModel,{Student} from '../Model/PostModel';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';




const StudentList : FC<{navigation:any,route:any}> = ({navigation,route}) => {
  const [data,setData] = useState<Student[]>([]);
  const[currentUser,setCurrentUser] = useState("");
  console.log(data);
  const onItemSelected = (id:string) =>{
    console.log("Item selected: "+id);
    navigation.navigate('StudentDetailsPage',{id:id});
  }
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus',async()=>{
      console.log("screen in focus");
      try{
        const students = await StudentModel.getAllStudents(route.params.accessToken);
        setData(students)
      }catch(err){
        console.log("Failed to read Students from Server: "+err);
        setData(Array<Student>())
      }
    })
    return unsubscribe;
  },[navigation])

  useEffect(()=>{
    if(route.params?.user){
      setCurrentUser(JSON.stringify(route.params.user))
    }
  },[route.params?.user])
  useEffect(()=>{
    navigation.setOptions({
      headerRight: () =>(
        <MaterialCommunityIcons name="account-details" size={44} color="black"
        onPress={() => navigation.navigate('StudentAddPage')} />
      )
    })
  },[])

  return (
    <View style={styles.postPage}>
      <View style={styles.addPost}>
        <Ionicons name="add-circle" size={24} color="black"/>
      </View>
    <FlatList
      style={styles.flatList}
      data = {data}
      keyExtractor={(student)=>student._id}
      renderItem={({item})=> (
        <StudentListRow
          name={item.name}
          id={item._id}
          imgUrl={item.imageUrl}
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
  addPost:{
    marginStart:370,
    margin:10
  },
    flatList:{
        //flex:1
    }
});
export default StudentList