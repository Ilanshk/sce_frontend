import { FC,useState,useEffect} from "react";
import { FlatList,View,StyleSheet, Pressable,Text,TextInput, Keyboard } from "react-native";
import MessageComponent from './MessageComponent';
import {socket} from '../App'
import HeaderOptions from '../Components/Menu';
import UserApi from '../Api/UserApi';
import CryptoJS from "react-native-crypto-js";

let privateKeyClient = 0;
let privateKey = 0;
let usersList = new Array();


type Message = {
    owner: string,
    content: string,
    time:{hour:number, minute:number}
}

const ChatPage : FC<{navigation:any,route:any}> = ({navigation,route}) => {

    
    const[allMessages,setAllMessages] = useState<Message[]>([]);
    const[currentChatMessageOwner,setCurrentChatMessageOwner] = useState<string>(route.params.userName);
    const[currentChatMessageContent,setCurrentChatMessageContent] = useState<string>('');
    const[messageTime,setMessageTime] = useState<{hour:string|number,minute:string|number}>({hour:0,minute:0});
    const[isFocusInput,setIsFocusInput] = useState(true);
    
    //The client decrypts the message and sends to the server
    socket.on('getMessage',(message)=>{
        var decryptedMessageBytes = CryptoJS.AES.decrypt(message["content"], privateKey.toString());
        var decryptedMessageText = decryptedMessageBytes.toString(CryptoJS.enc.Utf8); 
        if(decryptedMessageText.length > 0){
            setAllMessages([...allMessages,{owner: message.owner ,content: decryptedMessageText,time:message["time"]}])
        }   
    })

   //The client asks to server to get its dictionary of user sockets
    socket.on('getListOfSocketsClient',(listOfSockets) => {
        console.log(listOfSockets.usersList)
        usersList = listOfSockets.usersList
    })
    
    const SendActualMessage = async() => {
        
        const sendMsgTime = {
            hour: new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours(),
            minute: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes(),
        }
        setMessageTime(sendMsgTime)
        if(currentChatMessageOwner){
            if(socket.id != null)
            {

                const temp = async() => {
                    try{
                        const response = await socket.emitWithAck("getKeysFromServer")
                        usersList = response.data
                        
                    }
                    catch(err){
                        console.log(err)
                    }
                }
                
                await temp()
                
                usersList.forEach(element => {
                    var cipheredMessage = CryptoJS.AES.encrypt(currentChatMessageContent, element[1].toString()).toString();
                    socket.emit('sendMessage',{messageContent:cipheredMessage,time:sendMsgTime, owner: currentChatMessageOwner});
                });
                
            }
        }
            
    }
    //Function from Github for accurate calculation of the key
    // Refernce can be found in the project's report
    const modularExponentiation = (a:number, b:number, n:number)=> {
        a = a % n;
        var result = 1;
        var x = a;
      
        while(b > 0){
          var leastSignificantBit = b % 2;
          b = Math.floor(b / 2);
      
          if (leastSignificantBit == 1) {
            result = result * x;
            result = result % n;
          }
      
          x = x * x;
          x = x % n;
        }
        return result;
      };
    
    useEffect(()=>{
        const publicKeyServer = async() =>{
            let res =  await socket.emitWithAck("setPublicKeyServer")
            privateKeyClient = Math.floor(Math.random() * 100);
            privateKey = modularExponentiation(res.publicKey[0],privateKeyClient, res.publicKey[1])
            const publicKey = modularExponentiation(res.publicKey[2], privateKeyClient, res.publicKey[1])
            res = await socket.emitWithAck("getPublicKeyServer", {key: publicKey})
            if(res.key == privateKey){
                console.log('Key accepted');
                
            }

        }
        publicKeyServer().then(()=>console.log("publicKeyServer: ",privateKey))
        
        
        
        navigation.setOptions({
            headerRight: () =>(
                <View>
                    <HeaderOptions
                      logOutOfApp={()=>{
                        UserApi.logOutUser(route.params.refreshToken);
                        privateKey = 0;
                        navigation.navigate('LogInPage');
                      }} 
                    />
                </View>
            ),
            headerTitle: `Chat(Me,${route.params.userName})`,

        })
        
    },[])

    const createIdForMessage = () =>{
        return Math.random().toString(20).substring(2, 10);
    }

    const handleSendMessage = () =>{
        SendActualMessage()
        setCurrentChatMessageContent('');
        Keyboard.dismiss();
    }
    
    return(
        <View style={styles.MainContainer}>
            <View style={styles.innerContent}>
                { allMessages[0] ?
                <FlatList
                data={allMessages}
                renderItem={({item})=><MessageComponent currentMessage={item.content} currentUser={item.owner} currentTime={item.time} logedInUser={route.params.userName}/>}
                keyExtractor={(item) => createIdForMessage()}
                />
                :<Text style={styles.emptyChatMsg}>No Messages in this Chat</Text>
                }
            </View>

            <View style={styles.messageInputWrapper}>
                <TextInput 
                    style={isFocusInput? styles.messageInputFocus : styles.messageInputBlur}
                    value={currentChatMessageContent}
                    onChangeText={setCurrentChatMessageContent}
                    placeholder="Enter Your Message Here"
                    multiline={true}
                    onFocus={() => setIsFocusInput(true)}
                    onEndEditing={() => setIsFocusInput(false)}
                />
                <Pressable style={styles.sendBtn} onPress={handleSendMessage}>
                    <View>
                        <Text style={styles.sendBtnText}>Send</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    MainContainer:{
        flex:1,
        backgroundColor:'#d0e7f9'

    },
    innerContent:{
        paddingHorizontal:10,
        paddingVertical:15,
        height:'86%'
        

    },
    messageInputBlur:{
        borderWidth: 3,
        borderColor:'black',
        flex:1,
        marginRight:15,
        borderRadius:10,
        fontSize:25
    },
    messageInputFocus:{
        borderWidth: 3,
        borderColor:'#983ab0',
        flex:1,
        marginRight:15,
        borderRadius:10,
        fontSize:25
    },
    messageInputWrapper:{
        width:'100%',
        height:100,
        flexDirection:'row',
        backgroundColor:'white',
        paddingVertical:10,
        paddingHorizontal: 15,
        justifyContent:'center',
        position:'absolute',
        bottom:0
    },
    sendBtn:{
        width:'30%',
        borderRadius:50,
        backgroundColor:'lightblue',
        alignItems:'center',
        justifyContent:'center'
    },
    sendBtnText:{
        fontSize:20
    },
    emptyChatMsgContainer:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
       
    },
    emptyChatMsg:{
        fontSize:20
    }


})

export default ChatPage;