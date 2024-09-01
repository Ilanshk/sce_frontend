import LoginApi from "../Api/LoginApi";
import {View,StyleSheet,Text,TextInput,Alert} from 'react-native';
import { FC,useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';


const LoginPage:FC<{navigation:any}> = ({navigation}) =>{
    const [username,setUsername] = useState<string>("");
    const[password,setPassword] = useState<string>("");
    const[isFocusEmail,setIsFocusEmail] = useState(false);
    const[isFocusPassword,setIsFocusPassword] = useState(false);


    useEffect(() => {
        navigation.setOptions({
            headerRight:()=> <Text></Text>
        })  
    }, []);

    


    const handleLoginWithEmailAndPassword = async (userDetails:{email:string,password:string}) =>{
        const res =  await LoginApi.loginWithEmailAndPassword(userDetails.email,userDetails.password);
        if(res.ok){
            navigation.navigate('ChatPage',{accessToken:res.data.accessToken,userName:res.data.userName,userId:res.data.userId,refreshToken:res.data.refreshToken})
        }
        if(res.status == 400){
            Alert.alert("Wrong Details","Please Check your email and password")
        }
    }
    

    return (
        <View style={styles.loginPageContainer}>
            <Text style={styles.topMessage}>Already part of our community? Login Here!</Text>
            
            <View style={styles.details}>
                <View style={styles.email}>
                    <Text style={styles.fieldTitle}>Email</Text>
                    <TextInput style={isFocusEmail ?styles.inputFocus : styles.inputBlur}
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Your Email..."
                        onFocus={() => setIsFocusEmail(true)}
                        onEndEditing={() => setIsFocusEmail(false)}
                    ></TextInput>
                </View>

                <View style={styles.password}>
                    <Text style={styles.fieldTitle}>Password</Text>
                    <TextInput style={isFocusPassword ?styles.inputFocus : styles.inputBlur}
                        value={password}
                        textContentType='password'
                        onChangeText={setPassword}
                        placeholder="Your password..."
                        onFocus={() => setIsFocusPassword(true)}
                        onEndEditing={() => setIsFocusPassword(false)}
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
        backgroundColor:'#22c8d4'
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
    inputBlur:{
        width:300,
        height: 50,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize:15
    },
    inputFocus:{
        width:300,
        height: 50,
        borderWidth: 3,
        borderColor: '#983ab0',
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize:15
    },
    fieldTitle:{
        bottom:10,
        fontSize:15
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
        top:20,
        fontWeight:'bold',
        fontSize:25
    },
    underline:{
        textDecorationLine: 'underline'   
    }

})
    

export default LoginPage;