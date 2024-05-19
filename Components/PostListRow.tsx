import { StyleSheet,Button, Text, View, Image,Alert, TouchableOpacity, Pressable,Platform, TextInput,StatusBar, TouchableHighlight } from 'react-native';
import React,{FC, useEffect, useState} from 'react';


const PostListRow:FC<
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
         underlayColor={'gray'}>
            <View style = {styles.listrow}>
              <View style={styles.user}>
                {imgUrl &&<Image style={styles.avatar} source={{uri:imgUrl}}/>}
                {!imgUrl &&<Image style={styles.avatar} source={require("../assets/avatar.png")}/>}
                <Text style={styles.name}>{owner}</Text>
              </View>
                <View>
                    <Text style={styles.content}>{content}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  listrow:{
    flexDirection:'column',
    marginHorizontal:7,
    marginVertical:5,
    elevation :1,
    borderWidth:2,
    borderColor:'#18c5d9'
  },
  user:{
    flexDirection:'row',
    alignItems:'center'
  },
  avatar:{
    alignSelf:'center',
    height:80,
    width:80,
    margin: 10,
    borderRadius: 10
  },
  name:{
    fontSize:25,
    marginBottom:15,
    fontWeight:'bold'
  },
  content:{
    fontStyle:'normal',
    fontSize:20,
  },
  
});

export default PostListRow;