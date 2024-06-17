import { View,Image,StyleSheet, StatusBar,Text, Button, TextInput, ScrollView, TouchableOpacity,Alert, ActivityIndicator } from "react-native";
import { useState,FC, useEffect,useRef } from "react";
import userModel,{User} from "../Model/userModel";
import PostModel from "../Model/PostModel";
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import HeaderOptions from "./Menu";
import UserApi from "../Api/UserApi";
import AddPictureApi from "../Api/AddPictureApi";



const ProfilePage:FC<{route:any,navigation:any}>=({route,navigation}) =>{
  const [user,setUser] = useState<User>();
  const [isEditAge,setIsEditAge] = useState(false);
  const [isEditCountry,setIsEditCountry] = useState(false);
  const[age,setAge] = useState<string>();
  const [country,setCountry] = useState<string>('');
  const [userProfileImage,setUserProfileImage] = useState<string>("");
  const[dispalyActivityIndicator,setDisplayActivityIndicator] = useState(true);
  
  const countryInputRef = useRef<TextInput>(null);
  const ageInputRef = useRef<TextInput>(null);

  const activateAgeField = () =>{
    setIsEditAge(true);
    if(ageInputRef.current){
      ageInputRef.current.focus();
    }
  }

  const activateCountryField = () =>{
    setIsEditCountry(true);
    if(countryInputRef.current){
      countryInputRef.current.focus();
    }
  }

  const onSave = async() =>{
    let saveResponse;
    if(isEditAge){
      saveResponse = await userModel.updateUserData(route.params.id,age)
    }
    if(isEditCountry){
      saveResponse = await userModel.updateUserData(route.params.id,country);
    }
    if(isEditAge && isEditCountry){
      saveResponse = await userModel.updateUserData(route.params.id,age,country)
    }
    setDisplayActivityIndicator(true);
    setTimeout(()=>{
      setDisplayActivityIndicator(false);
      setIsEditAge(false);
      setIsEditCountry(false);
    },2000);

  }
  
  useEffect(()=>{
    const fetchUser = async () => {
      const fetchedUser = await userModel.getUserById(route.params.id);
      setUser(fetchedUser);
      setAge(fetchedUser.userAge);
      setCountry(fetchedUser.userCountry);
      setUserProfileImage(route.params.photo);
    };

    fetchUser();
  }, [route.params.id]);
  
  
  useEffect(()=>{
    if(user){
      navigation.setOptions({
        title: user?.firstName + user?.lastName,
        headerRight:()=>(
          <HeaderOptions 
            navigateToProfile={()=>{}}
            logOutOfApp={()=>{
              navigation.navigate('LogInPage');
              UserApi.logOutUser(route.params.refreshToken);
            
            }}
            navigateToHome={()=>navigation.navigate('HomePage',{accessToken:route.params.accessToken,refreshToken:route.params.refreshToken})}
          />
        )
      })
      //setDisplayActivityIndicator(false);
    }
  },[user])

  setTimeout(()=>setDisplayActivityIndicator(false),3000);

  return(
    <View style={styles.container}>
      {!dispalyActivityIndicator ?<View style={styles.container}>
      <ScrollView style = {styles.scrollView}>
        <View>
          {user?.userImageUrl? <Image style={styles.avatar}source={{uri:user?.userImageUrl}}/>
          :<Image style={styles.avatar} source={require("../assets/avatar.png")}/>}
          <TouchableOpacity
              onPress={async()=>{
                const uri = await AddPictureApi.activateCamera();
                if(uri){
                  const urlImg = await PostModel.uploadImage(uri);
                  setUserProfileImage(urlImg);
                  await userModel.updateUserData(route.params.id,undefined,undefined,urlImg);
                  setDisplayActivityIndicator(true);
                  setTimeout(() => {
                    setDisplayActivityIndicator(false);
                    Alert.alert("Profile Image Update","You Image was updated");
                  })
                }
              }}
          >
            <Fontisto name="camera" size={24} color="black" style={styles.cameraButton} />
          </TouchableOpacity>
          <TouchableOpacity
              onPress={async()=>{
                const uri = await AddPictureApi.openGallery();
                if(uri){
                  const urlImg = await PostModel.uploadImage(uri);
                  setUserProfileImage(urlImg);
                  userModel.updateUserData(route.params.id,undefined,undefined,urlImg);
                }
              }
                }
          >
            <FontAwesome6 name="image" size={24} color="black" style={styles.galleryButton} />
          </TouchableOpacity>

        </View>
      
        <View style={styles.userName}>
          <Text style={styles.name}>{user?.firstName + " "}</Text>
          <Text style={styles.name}>{user?.lastName}</Text>
        </View>

        
        <View style={styles.userDetails}>

          <View style={styles.userDetail}>
            <Text style={styles.name}>Email:</Text>
            <TextInput 
              editable={false} 
              style={styles.input}
            >{user?.email}</TextInput>
          </View>

          <View style={styles.userDetail}>
            <Text style={styles.name}>Age:</Text>
            <TextInput editable={true} 
              style={styles.input}
              keyboardType="numeric" 
              ref={ageInputRef}
              onChangeText={setAge}
            >
              {user?.userAge}
            </TextInput>
            <Entypo name="edit" size={24} color="black" onPress={activateAgeField} />
          </View>

          <View style={styles.userDetail}>
            <Text style={styles.name}>I'm from:</Text>
            <TextInput  
              style={styles.input}
              ref = {countryInputRef}
              editable = {true}
              onChangeText={setCountry}
            >
                {user?.userCountry} 
            </TextInput>
            <Entypo name="edit" size={24} color="black" onPress={activateCountryField}
             />
          </View>

        </View>
          
        {(isEditAge || isEditCountry) &&
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
        }

      <TouchableOpacity style={styles.myPostsBtn}>
        <Button
            onPress = {() => navigation.navigate('UserPostsPage',{userId:route.params.id,userName:route.params.userName,accessToken:route.params.accessToken,refreshToken:route.params.refreshToken})}
            title = "My Posts"
          />
      </TouchableOpacity>
      </ScrollView>
      </View>
      :<View style={styles.activityIndicator}><ActivityIndicator size={100}/></View>}
      </View>
    )

}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        flex:1,
        flexDirection:'column',
    },
    scrollView:{
      marginHorizontal:5,
    
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
        borderRadius:50
    },
    userName:{
      flexDirection:'row',
      justifyContent:'center', 
      marginBottom:15
    },
    name:{
      fontSize:30
    },
    input:{
      
      fontSize:30,
      borderWidth:1,
      borderRadius:10,
      width:250,
      borderColor: '#007BFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      backgroundColor: '#FFFFFF',
      color: '#00796B'
      
    },
    userDetails:{
      flexDirection:'column'
    },
    userDetail:{
      flexDirection:'row',
      marginBottom:10,
      alignItems:'center'

    },
    buttons:{
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    saveBtn:{
      flex:1,
      margin:10,
      alignItems:'center',
      backgroundColor:'green',
    },
    cancelBtn:{
      flex:1,
      margin:10,
      alignItems:'center',
      backgroundColor:'red'

    },
    buttonText:{
        padding:10,
        fontWeight:'bold',
        fontSize:16
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
    },
    myPostsBtn:{
      marginTop:20,
      backgroundColor: '#007BFF',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      
    }
});

export default ProfilePage;