import LoginApi from "../Api/LoginApi";
import {View,StyleSheet,Text,TextInput,Button, ImageBackground} from 'react-native'
import { FC,useEffect, useState } from "react";
import {GoogleSignin,GoogleSigninButton} from "@react-native-google-signin/google-signin";
import StudentList from "./StudentList";
import { Feather } from '@expo/vector-icons';

const LoginPage:FC<{navigation:any}> = ({navigation}) =>{
    const [username,setUsername] = useState<string>("");
    const[password,setPassword] = useState<string>("");

    // GoogleSignin.configure({
    //     // webClientId:"585864436510-boe9id7jrqrcgsqdmuipds5tjvormp2h.apps.googleusercontent.com",
    //     //androidClientId:"585864436510-ib4u72t916hhta74vfu2eqpoag3l78g2.apps.googleusercontent.com"
    // })
    const configureGoogleSignIn = () =>{
        
        GoogleSignin.configure(
            {
                webClientId:"585864436510-boe9id7jrqrcgsqdmuipds5tjvormp2h.apps.googleusercontent.com"
            }
        );
    }

    useEffect(() => {
        configureGoogleSignIn();
        GoogleSignin.signOut();   
    }, []);

    const handleGoogleSignIn = async () =>{
        try{
            console.log("Button clicked");
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            //console.log("Login Page-User info"+userInfo.idToken);
            const tokenToServer = userInfo.idToken;
            const serverResponse = await LoginApi.loginWithGoogle(tokenToServer)
            if(serverResponse.data.userTokens){
                navigation.navigate('StudentList')
            }

            
        }catch(error){
            console.log("Error sign-in with google: "+error);
            
        }
    }


    const handleLoginWithEmailAndPassword = async (userDetails:{email:string,password:string}) =>{
        const res =  await LoginApi.loginWithEmailAndPassword(userDetails.email,userDetails.password);
        if(res.data.accessToken){
            console.log("access Token: "+res.data.accessToken);
            
            navigation.navigate('StudentList',{accessToken:res.data.accessToken})
        }
    }


    return (
        <View style={styles.loginPageContainer}>
            <Text style={styles.topMessage}>Already part of our community? Login Here!</Text>
            
            <View style={styles.details}>
                <View style={styles.email}>
                    <Text style={styles.fieldTitle}>Email</Text>
                    <TextInput style={styles.input}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Your Email..."
                    ></TextInput>
                </View>

                <View style={styles.password}>
                    <Text style={styles.fieldTitle}>Password</Text>
                    <TextInput style={styles.input}
                        value={password}
                        textContentType='password'
                        onChangeText={setPassword}
                        placeholder="Your password..."
                        secureTextEntry={true}
                    >
                    </TextInput>
                </View> 
            </View>

            <View style={styles.loginRegister}>
                <View style={styles.login}>
                    <Text style={styles.loginText}>Log In</Text>
                    <Feather name="arrow-right-circle" size={44} color="black" onPress={async()=> {
                        await handleLoginWithEmailAndPassword({
                            email: username,
                            password:password
                        }) 
                        }}
                        style={styles.arrowLogIn}
                     />
                </View>
                
                <Text>
                    _______________________or___________________________
                </Text>
                <GoogleSigninButton
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress = {handleGoogleSignIn}
                />
                <Text style={styles.register}>
                    Doesn't have an account yet? 
                    <Text style={styles.underline} onPress={()=>navigation.navigate('RegisterPage')}>
                          Register Here
                    </Text>
                </Text>
            </View>     
        </View>
        
    );

}

const styles =StyleSheet.create(
{
    loginPageContainer:{
        flex:1,
        alignItems: 'center',
        flexDirection:'column',
        backgroundColor:'#e3a724'
    },
    topMessage:{
        top:30,
        fontWeight:'bold',
        fontSize:25
        
    },
    details:{
        top:70,
        flexDirection:'column'
    },
    email:{
        flexDirection:'column',
        bottom:10
    },
    password:{
        flexDirection:'column',
        bottom:10,
        top:10
    },
    input:{
        width:300,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    fieldTitle:{
        bottom:10
    },
    login:{
        flexDirection:'row',
        bottom:20,
        justifyContent:'center',
        alignItems:'center',
        top:2
    },
    loginText:{
        fontWeight:'bold',
        fontSize:20,
        right:50
    },
    arrowLogIn:{
        right:1,
    },
    loginRegister:{
        flexDirection:'column',
        top:100,
        bottom:100
    },
    register:{
        top:10,
        fontWeight:'bold',
        fontSize:15
    },
    underline:{
        textDecorationLine: 'underline'   
    }

})
    

export default LoginPage;