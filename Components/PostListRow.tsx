import { StyleSheet,Button, Text, View, Image,Alert, TouchableOpacity, Pressable,Platform, TextInput,StatusBar, TouchableHighlight } from 'react-native';
import React,{FC, useEffect, useState} from 'react';


const StudentListRow:FC<
    {idPostOwner:string,
    idPost:string,
    imgUrl:string,
    content:string,
    onItemSelected:(id:string)=>void,
    getFullName:(userId:string)=>Promise<string|undefined>
    }
    >=({idPostOwner,idPost,imgUrl,content,onItemSelected,getFullName})=>{

      const[owner,setOwner] = useState<string|undefined>("")

    const onPress = () =>{
       onItemSelected(idPost);
    };

    useEffect(()=>{
      getFullName(idPostOwner).then((ownerName)=>setOwner(ownerName))
    },[])

    
    return(
        <TouchableHighlight
         onPress={onPress}
         underlayColor={'grey'}>
            <View style = {styles.listrow}>
              <View style={styles.user}>
                {imgUrl &&<Image style={styles.avatar} source={{uri:imgUrl}}/>}
                {!imgUrl &&<Image style={styles.avatar} source={require("../assets/avatar.png")}/>}
                <Text style={styles.name}>{owner}</Text>
              </View>
                <View style={styles.info}>
                    <Text style={styles.content}>{content}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  listrow:{
    flexDirection:'column',
    marginHorizontal:5,
    marginVertical:1,
    elevation :1,
    borderWidth:1,
    
    //borderRadius:2
    
  },
  avatar:{
    alignSelf:'center',
    height:100,
    width:100,
    margin: 10,
    borderRadius: 100
  },
  info:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  id:{
    fontSize:20,
    //marginVertical:10
    marginBottom:5
  },
  name:{
    fontSize:25,
    //marginVertical:10,
    marginBottom:5,
    fontWeight:'bold'
  },
  content:{
    fontStyle:'normal',
    fontSize:20,
    fontWeight:'bold',
    left:0
  },
  user:{
    flexDirection:'row'
  }
});

export default StudentListRow;