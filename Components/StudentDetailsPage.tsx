import { View,Image,StyleSheet, StatusBar,Text, Button, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useState,FC, useEffect,useRef } from "react";
import PostModel, { Post } from "../Model/PostModel";
import userModel,{User} from "../Model/userModel";
import { Entypo } from '@expo/vector-icons';


const ProfilePage:FC<{route:any,navigation:any}>=({route,navigation}) =>{
  const [user,setUser] = useState<User>();
  const [isEditAge,setIsEditAge] = useState(false);
  const [isEditCountry,setIsEditCountry] = useState(false);
  const[age,setAge] = useState<string>();
  const [country,setCountry] = useState<string>('');
  
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

  }
  
  useEffect(()=>{
    const fetchUser = async () => {
      const fetchedUser = await userModel.getUserById(route.params.id);
      setUser(fetchedUser);
      setAge(fetchedUser.userAge);
      setCountry(fetchedUser.userCountry);
    };

    fetchUser();
  }, [route.params.id]);
  
  
  useEffect(()=>{
    if(user){
      navigation.setOptions({
        // title: user?.firstName + user?.lastName,
        headerRight:()=>(
          <Button
            onPress = {() => navigation.navigate('UserPostsPage',{userId:route.params.id,userName:route.params.userName,accessToken:route.params.accessToken})}
            title = "My Posts"
          />
        )
      })
    }
  },[user])
  return(
    <View style={styles.container}>
      <ScrollView style = {styles.scrollView}>
        {user?.userImageUrl? <Image style={styles.avatar}source={{uri:user?.userImageUrl}}/>
        :<Image style={styles.avatar} source={require("../assets/avatar.png")}/>}
      
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
            <Text style={styles.cancelBtn}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
            <Text style={styles.saveBtn}>Save</Text>
          </TouchableOpacity>
        </View>
        }
        
      </ScrollView>
      </View>
    )

}

const styles = StyleSheet.create({
    container:{
        marginTop:StatusBar.currentHeight,
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
    },
    name:{
      fontSize:30
    },
    input:{
        // padding:10,
        fontSize:30,
        borderWidth:1,
        width:250,
        borderRadius:10
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
        padding:10
    }
});

export default ProfilePage;