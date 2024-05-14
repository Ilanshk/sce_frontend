import { TextInput,View,Image,StyleSheet, StatusBar, TouchableOpacity,Text, ScrollView } from "react-native";
import { useState,FC, useEffect } from "react";
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import AddPictureApi from "../Api/AddPictureApi";

const StudentAddPage:FC<{navigation:any}> = ({navigation}) =>{
    const [name,onChangeName] = useState("");
    const [id,onChangeId] = useState("");
    const [address,onChangeAddress] = useState("");
    const [imageUrl,setImageUrl] = useState<string>("");

    
    useEffect(()=>{
      AddPictureApi.askCameraPermission();
    },[])

  
    const handleOnCancel = () =>{
      console.log('Cancel');
      navigation.navigate('StudentList');
    }


    const handleActivateCamera = async()=>{
      try{
        const uriCamera= await AddPictureApi.activateCamera();
        if(uriCamera){
          setImageUrl(uriCamera);
        }
      }catch(error){
        console.log("Error in activating camera: "+error);
        
      }
    }

    const handleOpenGallery = async() =>{
      try{
        const uriGallery= await AddPictureApi.openGallery();
        if(uriGallery){
          setImageUrl(uriGallery);
        }
      }catch(error){
        console.log("Error in opening gallery: "+error);
      }
    }

    const handleOnSave = async () =>{
      try{
         await AddPictureApi.onSave(imageUrl,name,id);
         navigation.navigate('StudentList'); 
      }
      catch(error){
         console.log("Error saving new student: "+error)
      }

    }
    
    return(
      <ScrollView>
        <View style={styles.container}>
          <View>
            {imageUrl == "" &&<Image style={styles.avatar}source={require('../assets/avatar.png')}/>}
            {imageUrl != "" && <Image source={{uri:imageUrl}} style={styles.avatar}/>}
            <TouchableOpacity
              onPress={handleActivateCamera}
            >
              <Fontisto name="camera" size={24} color="black" style={styles.cameraButton} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOpenGallery}
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
          <TouchableOpacity style={styles.button} 
            onPress={handleOnCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} 
            onPress={handleOnSave}>
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