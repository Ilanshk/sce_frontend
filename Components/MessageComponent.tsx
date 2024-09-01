import { View,Text,StyleSheet } from "react-native";
import {FC} from "react";


const MessageComponent:FC<{currentMessage:string,currentUser:string,currentTime:{hour:string|number,minute:string|number},logedInUser:string}>= ({currentMessage,currentUser,currentTime,logedInUser})=>{
    const whichUser = currentUser != logedInUser; 
    return(
    
        <View style= {whichUser? [styles.messageWrapper,styles.messageFromOtherUser] : styles.messageWrapper}>
            <View style={styles.messageData}>
                <Text style={styles.currentuserName}>{currentUser}</Text>
                <Text style={styles.messageInput}>{currentMessage}</Text>
            </View>
            <View>
            <Text style={styles.messageTime}>{currentTime.hour}:{currentTime.minute}</Text>
            </View>
        </View>
    
    );
}

const styles = StyleSheet.create({
    pageContainer:{
        backgroundColor:'#d0e7f9',
        
        
    },
    messageWrapper:{
    backgroundColor: 'lightgreen',
    borderRadius: 8, 
    padding: 10,
    marginVertical: 5,
    width: '50%',
    alignSelf: 'flex-start',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2

    },
    messageData:{

    },
    currentuserName:{
        fontSize:25,
        marginBottom:15
    },
    messageTime:{
        fontSize:15,
        alignSelf:'flex-end'
    },
    messageInput:{
        fontSize:20,
        marginBottom:20
    },
    messageFromOtherUser:{
        alignSelf:'flex-end'
    }

})

export default MessageComponent;