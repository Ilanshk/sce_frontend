import React,{FC, useEffect, useState} from 'react';
import{Text,FlatList, StyleSheet, Button }from 'react-native';
import StudentListRow from './StudentListRow';
import StudentModel,{Student} from '../Model/PostModel';




const StudentList : FC<{navigation:any,route:any}> = ({navigation,route}) => {
  const [data,setData] = useState<Student[]>([]);
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
    navigation.setOptions({
      headerRight: () =>(
        <Button 
          onPress={() => navigation.navigate('StudentAddPage')} 
          title='Add'
        />
      )
    })
  },[])
  return (
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
  )
}


const styles = StyleSheet.create({
    flatList:{
        flex:1
    }
});
export default StudentList