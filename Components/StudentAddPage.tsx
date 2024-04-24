import { TextInput,View,Image,StyleSheet, StatusBar, TouchableOpacity,Text } from "react-native";
import { useState,FC } from "react";
import StudentModel, {Student} from "../Model/PostModel"

const StudentAddPage:FC<{navigation:any}> = ({navigation}) =>{
    const [name,onChangeName] = useState("");
    const [id,onChangeId] = useState("");
    const [address,onChangeAddress] = useState("");
    const onSave = () =>{
        console.log('save');
        const student:Student = {
          name:name,
          id:id,
          imageUrl:address
        }
        StudentModel.addStudent(student);
        navigation.navigate('StudentList');
    }
    const onCancel = () =>{
        console.log('Cancel');
        navigation.navigate('StudentList');

    }
    
    return(
        <View style={styles.container}>
        <Image style={styles.avatar}source={require('../assets/avatar.png')}/>
        <TextInput
          style = {styles.input}
          onChangeText={onChangeName}
          value = {name}
          placeholder="Enter Your Name"
        />
        <TextInput
          style = {styles.input}
          onChangeText={onChangeId}
          value = {id}
          placeholder="Enter Your ID"
        />
        <TextInput
          style = {styles.input}
          onChangeText={onChangeAddress}
          value = {address}
          placeholder="Enter Your Address"
        />
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
        
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

export default StudentAddPage;