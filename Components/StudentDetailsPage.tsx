import { View,Image,StyleSheet, StatusBar,Text, Button } from "react-native";
import { useState,FC, useEffect } from "react";
import StudentModel from "../Model/PostModel";


const StudentDetailsPage:FC<{route:any,navigation:any}>= ({route,navigation}) =>{
  const student = StudentModel.getStudent(route.params.id);
  useEffect(()=>{
    navigation.setOptions({
      title: student?.name,
      headerRight:()=>(
        <Button
          onPress = {() => navigation.navigate('StudentAddPage')}
          title = "Edit"
        />
      )
    })
  },[])
  return(
    <View style={styles.container}>
      <Image style={styles.avatar}source={require('../assets/avatar.png')}/>
      <Text style = {styles.input}>{student?.name}</Text>
      <Text style = {styles.input}>{student?.id}</Text>
      <Text style = {styles.input}>{student?.imageUrl}</Text>
        
          
        {/* <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View> */}
        
      </View>
    )

}

const styles = StyleSheet.create({
    container:{
        marginTop:StatusBar.currentHeight,
        flex:1,
        flexDirection:'column'
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        backgroundColor:'blue'
    },
    avatar:{
        alignSelf:'center',
        height:200,
        width:200,
        margin: 10,
        borderRadius: 100
    },
    input:{
        height:40,
        margin:12,
        borderWidth:1,
        padding:10
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    button:{
        flex:1,
        margin:10,
        alignItems:'center'
    },
    buttonText:{
        padding:10
    }
});

export default StudentDetailsPage;