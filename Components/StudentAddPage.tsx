import { TextInput,View,Image,StyleSheet, StatusBar, TouchableOpacity,Text, ScrollView } from "react-native";
import { useState,FC, useEffect } from "react";
import StudentModel, {Student} from "../Model/PostModel"
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

const StudentAddPage:FC<{navigation:any}> = ({navigation}) =>{
    const [name,onChangeName] = useState("");
    const [id,onChangeId] = useState("");
    const [address,onChangeAddress] = useState("");
    const [imageUrl,setImageUrl] = useState("");

    const onSave = async() =>{
      //const url = await StudentModel.uploadImage(imageUrl);
      //console.log("url at onSave(): " +url);
      console.log('save button was pressed');
        const student:Student = {
          name:name,
          _id:id,
          imageUrl:""
        }
      try{
        if(imageUrl != ""){
          console.log("uploading image");
          const url = await StudentModel.uploadImage(imageUrl);
          student.imageUrl = url
          console.log("got url from upload at StudentAddPage: " + url);
          console.log("saving student");
          StudentModel.addStudent(student);
        }
          navigation.navigate('StudentList');
      }catch(err){
        console.log("Error in onSave() "+err);
        
      }
    }
    const onCancel = () =>{
        console.log('Cancel');
        navigation.navigate('StudentList');

    }
    const askCameraPermission = async() =>{
      try{
        const res= await ImagePicker.requestCameraPermissionsAsync();
          if(!res.granted){
            alert("You need to approve camera permission")
          }
      }catch(err){
        console.log("Ask Camera Permission Error:" +err)
      }
    }
    useEffect(()=>{
      askCameraPermission();
    },[])

    const activateCamera = async() =>{
      try{
        const response = await ImagePicker.launchCameraAsync();
        if(!response.canceled && response.assets.length > 0){
          const uri = response.assets[0].uri;
          console.log("activateCamera()-uri= "+uri);
          setImageUrl(uri);
        }
      }catch(err){
        console.log("Error while opening device camera: "+err);
        
      }
      
    }

    const openGallery = async() =>{
      try{
        const response = await ImagePicker.launchImageLibraryAsync();
        if(!response.canceled && response.assets.length > 0){
          const uri = response.assets[0].uri;
          setImageUrl(uri);
        }
      }catch(err){
        console.log("Error while opening device camera: "+err);
        
      }
    }
    
    return(
      <ScrollView>
        <View style={styles.container}>
          <View>
            {imageUrl == "" &&<Image style={styles.avatar}source={require('../assets/avatar.png')}/>}
            {imageUrl != "" && <Image source={{uri:imageUrl}} style={styles.avatar}/>}
            <TouchableOpacity
              onPress={activateCamera}
            >
              <Fontisto name="camera" size={24} color="black" style={styles.cameraButton} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openGallery}
            >
              <FontAwesome6 name="image" size={24} color="black" style={styles.galleryButton} />
            </TouchableOpacity>

          </View>
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
    </ScrollView>
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
        width:'100%',
        margin: 10,
        borderRadius: 100,
        resizeMode:'contain'
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
    },
    cameraButton:{
      position:'absolute',
      bottom:-15,
      left:15,
      width:50,
      height:50
    },
    galleryButton:{
      position:'absolute',
      bottom:-15,
      right:15,
      width:50,
      height:50
    }
});

export default StudentAddPage;