import {Button,View,Text,TextInput,StyleSheet, TouchableOpacity,Image, StatusBar, ScrollView} from 'react-native';
import { useState,FC, useEffect } from 'react';
import RegisterApi from '../Api/RegisterApi';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import AddPictureApi from '../Api/AddPictureApi';

const RegisterPage: FC<{navigation:any}> = ({navigation}) =>{
    const [userEmail,setUserEmail] = useState<string>("");
    const [userPassword,setUserPassword] = useState<string>("");
    const [userImage,setUserImage] = useState<string>("");
    const [userAge,setUserAge] = useState<string>("");
    const [userCountry,setUserCountry] = useState<string>("");
    const[firstName,setFirstName] = useState<string>("");
    const [lastName,setLastName] = useState<string>("");

    useEffect(()=>{AddPictureApi.askCameraPermission()},[]);

    const handleErrorInRegistration = () =>{
        setFirstName("");
        setLastName("");
        setUserEmail("");
        setUserPassword("");
        setUserAge("");
        setUserCountry("");
    }

    const handleUserRegister = async () =>{
        const userImageUrl = await AddPictureApi.onSave(userImage);
        console.log("handleUserRegister()--->url = "+userImageUrl);
        
        const resUserRegister = await RegisterApi.registerUser(firstName,lastName,userEmail,userPassword,userImageUrl,userAge,userCountry);
        //User already exists in the application or email/password is missing
        if(resUserRegister.status == 409){
            handleErrorInRegistration();
            return alert("A user with that email already exists");  
        }
        //User did not provide email or password
        if(resUserRegister.status == 400){
            handleErrorInRegistration();
            return alert("One of the details is missing");
        }
       
        if(resUserRegister.data.userTokens.accessToken){
            navigation.navigate('HomePage',{accessToken:resUserRegister.data.userTokens.accessToken,userName:firstName+lastName})
        }
    }
    return (
        <View style = {styles.registrationPage}>
            <ScrollView style = {styles.scrollView} >
                <View style = {styles.heading}>
                    <Text style={styles.welcomeMessage}>
                        Welcome to Travmies!
                    </Text>
                    <Text style={styles.descriptionMessage}>
                        Start Sharing your travel memories with others and 
                        get inspiration for your next trip!
                    </Text>
                </View>
                <View>
                    {userImage == "" && <Image style={styles.avatar} source={require('../assets/avatar.png')}/>}
                    {userImage != "" && <Image source={{uri:userImage}} style={styles.avatar}/>}
                    <TouchableOpacity
                            onPress= { async ()=> {
                                const uri = await AddPictureApi.activateCamera();
                                if(uri){
                                    setUserImage(uri)}
                                }
                            }
                    >
                        <Fontisto name="camera" size={24} color="black" style={styles.cameraButton} />
                    </TouchableOpacity>
                    <TouchableOpacity
                            onPress={async()=>{
                                const uri =await AddPictureApi.openGallery();
                                if(uri){
                                    setUserImage(uri);
                                }}
                            }
                    >
                        <FontAwesome6 name="image" size={24} color="black" style={styles.galleryButton} />
                    </TouchableOpacity>
                </View>
                <View style={styles.registerDetails}>
                    <View style={styles.userdetail}>
                                <Text>First Name</Text>
                                <TextInput style={styles.input}
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    placeholder="First Name..."
                                    textContentType='name'
                                ></TextInput>
                    </View>
                    <View style={styles.userdetail}>
                                <Text>Last Name</Text>
                                <TextInput style={styles.input}
                                    value={lastName}
                                    onChangeText={setLastName}
                                    placeholder="Last Name..."
                                    textContentType='name'
                                ></TextInput>
                    </View>
                    <View style={styles.userdetail}>
                            <Text>Email</Text>
                            <TextInput style={styles.input}
                                value={userEmail}
                                onChangeText={setUserEmail}
                                placeholder="Your Email goes here..."
                                textContentType='emailAddress'
                            ></TextInput>
                    </View>

                    <View style={styles.userdetail}>
                            <Text>Password</Text>
                            <TextInput style={styles.input}
                                value={userPassword}
                                textContentType='password'
                                onChangeText={setUserPassword}
                                secureTextEntry={true}
                                placeholder="Your Password goes here..."
                            ></TextInput>
                    </View>

                    <View style={styles.userdetail}>
                            <Text>Age</Text>
                            <TextInput style={styles.input}
                                value={userAge}
                                onChangeText={setUserAge}
                                placeholder="Your Age"
                            ></TextInput>
                    </View>

                    <View style={styles.userdetail}>
                            <Text>Country</Text>
                            <TextInput style={styles.input}
                                value={userCountry}
                                onChangeText={setUserCountry}
                                placeholder="Your Country"
                                textContentType='countryName'
                            ></TextInput>
                    </View>
                    
                </View>
                <View style={styles.registerBtn}>
                    <Text style={styles.registerText}>Register</Text>
                    <Feather name="arrow-right-circle" size={44} color="green"
                        onPress={handleUserRegister}
                        style={styles.registerArrow}
                    />
                </View>
            </ScrollView>
        </View>
        
        
    )
}

const styles = StyleSheet.create({
    registrationPage:{
        marginTop:StatusBar.currentHeight,
        flex:1,
        flexDirection:'column',
        //alignItems:'center',
        //backgroundColor:'#80f28a94'
    },
    scrollView:{
        marginHorizontal: 10,
        backgroundColor:'white'
    },
    heading:{
        //top:20,
    },
    welcomeMessage:{
        fontWeight:'bold',
        bottom:10,
        fontSize:30
    },
    descriptionMessage:{
        fontSize:25,
        bottom:10
    },
    registerDetails:{
        flexDirection:'column',
        alignSelf:'center',
        height:400

    },
    userdetail:{
        top:30,
        flexDirection:'column',
        bottom:15
    },
    password:{
        top:30,
        flexDirection:'column',
        bottom:15
    },
    input:{
        width:300,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
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
    addImage:{
        
    },
    avatar:{
        alignSelf:'center',
        height:150,
        width:'100%',
        //margin: 10,
        borderRadius: 100,
        resizeMode:'contain'
    },
    registerBtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        top:0,
        left:40
    },
    registerArrow:{
        right:1
    },
    registerText:{
        fontWeight:'bold',
        fontSize:20,
        right:50
    }


});

export default RegisterPage;