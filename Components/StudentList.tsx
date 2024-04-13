import React,{FC, useEffect, useState} from 'react';
import{Text,FlatList, StyleSheet }from 'react-native';
import StudentListRow from './StudentListRow';
import StudentModel,{Student} from '../Model/StudentModel';



const StudentList : FC = () => {
  const [data,setData] = useState<Student[]>([]);
  const onItemSelected = (id:string) =>{
    console.log("Item selected: "+id);
  }
  useEffect(()=>{
    setData(StudentModel.getAllStudents());
  },[])
  return (
    <FlatList
      style={styles.flatList}
      data = {data}
      keyExtractor={(student)=>student.id}
      renderItem={({item})=> (
        <StudentListRow
          name={item.name}
          id={item.id}
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