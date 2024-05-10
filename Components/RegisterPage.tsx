import {Button,View,Text,TextInput,StyleSheet} from 'react-native';
import { useState,FC } from 'react';
import RegisterApi from '../Api/RegisterApi';
import { Feather } from '@expo/vector-icons';

const RegisterPage: FC<{navigation:any}> = ({navigation}) =>{
    const [userEmail,setUserEmail] = useState("");
    const [userPassword,setUserPassword] = useState("");

    const handleUserRegister = async (newUserDetails:{email:string,password:string}) =>{
        const resUserRegister = await RegisterApi.registerUser(newUserDetails.email,newUserDetails.password)
        //User already exists in the application or email/password is missing
        if(resUserRegister.status == 409){
            setUserEmail("");
            setUserPassword("");
            return alert("A user with that email already exists");  
        }
        if(resUserRegister.status == 400){
            setUserEmail("");
            setUserPassword("");
            return alert("Email or Password is missing");
        }
        if(resUserRegister.data.userTokens){
            navigation.navigate('StudentList')
        }
    }
    return (
        <View style = {styles.registrationPage}>
            <View style = {styles.heading}>
                <Text style={styles.welcomeMessage}>
                    Welcome to Travmies!
                </Text>
                <Text style={styles.descriptionMessage}>
                    Start Sharing your travel memories with others and 
                    get inspiration for your next trip!
                </Text>
            </View>
            <View style={styles.registerDetails}>
                <View style={styles.email}>
                        <Text style={styles.fieldTitle}>Email</Text>
                        <TextInput style={styles.input}
                            value={userEmail}
                            onChangeText={setUserEmail}
                            placeholder="Your Email goes here..."
                            textContentType='emailAddress'
                        ></TextInput>
                </View>

                <View style={styles.password}>
                        <Text style={styles.fieldTitle}>Password</Text>
                        <TextInput style={styles.input}
                            value={userPassword}
                            textContentType='password'
                            onChangeText={setUserPassword}
                            secureTextEntry={true}
                            placeholder="Your Password goes here..."
                        ></TextInput>
                </View>
            </View>
            <View style={styles.registerBtn}>
                <Text style={styles.registerText}>Register</Text>
                <Feather name="arrow-right-circle" size={44} color="black"
                    onPress={async()=>{
                        await handleUserRegister({
                            email: userEmail,
                            password:userPassword
                        })
                    }}
                    style={styles.registerArrow}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    registrationPage:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#80f28a94'
    },
    heading:{
        top:20,
    },
    welcomeMessage:{
        fontWeight:'bold',
        bottom:10,
        fontSize:30
    },
    descriptionMessage:{
        fontSize:25
    },
    registerDetails:{
        top:50,
        flexDirection:'column',
    },
    email:{
        top:30,
        flexDirection:'column',
        bottom:15
    },
    password:{
        top:50,
        flexDirection:'column',
        bottom:10
    },
    fieldTitle:{
        bottom:10
    },
    input:{
        width:300,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    registerBtn:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        top:120,
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