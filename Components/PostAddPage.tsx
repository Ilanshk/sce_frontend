import { TextInput,View,Image,StyleSheet, StatusBar, TouchableOpacity,Text, ScrollView, ActivityIndicator } from "react-native";
import { useState,FC, useEffect } from "react";
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import AddPictureApi from "../Api/AddPictureApi";
import PostModel,{ Post } from "../Model/PostModel";

const PostAddPage:FC<{navigation:any,route:any}> = ({navigation,route}) =>{
    const [postContent,setPostContent] = useState("");
    const [imageUrl,setImageUrl] = useState<string>("");
    const [dispalyActivityIndicator,setDisplayActivityIndicator] = useState(false);

    
    useEffect(()=>{
      AddPictureApi.askCameraPermission();
      navigation.setOptions({
        headerRight:()=><Text></Text>
      })
    },[])

  
    const handleOnCancel = () =>{
      navigation.navigate('HomePage',{accessToken:route.params.accessToken,refreshToken:route.params.refreshToken});
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
        const urlImageOfUser = await AddPictureApi.onSave(imageUrl);
        const post:Post = {
          _id:Date.now().toString(),
          postText:postContent,
          owner:route.params.owner,
          postImageUrl:urlImageOfUser,
         };
         console.log("Add new Post to the model");
         PostModel.addPost(post);
         setDisplayActivityIndicator(true);
         setTimeout(()=>{
           navigation.navigate('HomePage',{user:route.params.owner,refreshToken:route.params.refreshToken}); 
         },3000);
      }
      catch(error){
         console.log("Error saving new student: "+error)
      }

    }
    
    return(
      <ScrollView style={styles.scroll}>
        {!dispalyActivityIndicator ? <View style={styles.container}>
          <View>
            {imageUrl == "" &&<Image style={styles.avatar}source={require('../assets/imagePlaceHolder.jpg')}/>}
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
            onChangeText={setPostContent}
            value = {postContent}
            placeholder="Write Here your Post"
            multiline={true}
            
          />
         
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelBtn} 
              onPress={handleOnCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} 
              onPress={handleOnSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
      </View> : <View style={styles.activityIndicator}><ActivityIndicator size={100}/></View>}
    </ScrollView>
    )

}

const styles = StyleSheet.create({
    scroll:{
      flex:1
    },
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
        height:100,
        textAlignVertical: 'top',
        margin:12,
        borderWidth:1,
        padding:10
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    cancelBtn:{
      backgroundColor:'red',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    },
    saveBtn:{
      backgroundColor:'green',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
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
    },
    activityIndicator:{
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    }
});

export default PostAddPage;