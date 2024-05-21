import { StyleSheet,Button, Text, View, Image,Alert, TouchableOpacity, Pressable,Platform, TextInput,StatusBar, TouchableHighlight } from 'react-native';
import React,{FC, useEffect, useState,useRef} from 'react';
import userModel from '../Model/userModel';
import { Entypo } from '@expo/vector-icons';
import PostModel from '../Model/PostModel';


const PostListRow:FC<
    {idPostOwner:string,
    idPost:string,
    imgUrl:string,
    content:string,
    // onItemSelected:(id:string)=>void,
    getFullName:(userId:string)=>Promise<string|undefined>,
    getUserImgUrl:(userId:string)=>Promise<string|undefined>,
    isHomePage:boolean,
    isUserPostsPage:boolean
    }
    >=({idPostOwner,idPost,imgUrl,content,getFullName,getUserImgUrl,isHomePage,isUserPostsPage})=>{

      const[owner,setOwner] = useState<string|undefined>("");
      const [userImgUrl ,setUserImgUrl] = useState<string|undefined>("");
      const postContentRef= useRef<TextInput>(null);
      const[isEdit,setIsEdit] = useState(false);
      const[postContent,setPostContent] = useState<string>();
      const activateContentField = () =>{
        setIsEdit(true);
        if(postContentRef.current){
          postContentRef.current.focus();
        }
      }

      const onSave= async() =>{
        if(isEdit){
          const saveResponse = await PostModel.updatePost(idPost,content);
        }
      }
    const onPress = () =>{
       //onItemSelected(idPost);
    };

    // const getUserProfileImgUrl = async(userId: string) =>{
    //   try{
    //     const user = await userModel.getUserById(idPostOwner);
    //     return user.userImageUrl;
    //   }catch(error){
    //     console.log("Error retrieving user by id: "+error);
    //   }
    // }

    useEffect(()=>{
      getFullName(idPostOwner).then((ownerName)=>setOwner(ownerName));
      getUserImgUrl(idPostOwner).then((url) =>setUserImgUrl(url));
      setPostContent(content);
      console.log("User Image Url: "+userImgUrl);
    },[idPost])

    
    return(
        <TouchableHighlight
         onPress={onPress}
         underlayColor={'gray'}>
            <View style = {styles.listrow}>
              <View style={styles.topPart}>
                <View style={styles.imageAndName}>
                {userImgUrl &&<Image style={styles.avatar} source={{uri:userImgUrl}}/>}
                 <Text style={styles.name}>{owner}</Text>
                </View>
                 <Entypo style={styles.edit} name="edit" size={24} color="black" onPress={activateContentField}/>
              </View>
              <View style={styles.middlePart}>
                <TextInput 
                  style={styles.content}
                  editable={true}
                  ref={postContentRef}
                  onChangeText={setPostContent}
                  >
                  {content}</TextInput>
                {isEdit && <Button title="Save Changes" onPress = {onSave}/>}
              </View>
              <View>
                {imgUrl &&<Image style={styles.postImage} source={{uri:imgUrl}}/>}
                {!imgUrl &&<Image style={styles.postImage} source={require("../assets/avatar.png")}/>}
              </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  listrow:{
    flexDirection:'column',
    marginHorizontal:2,
    marginVertical:5,
    elevation :1,
    borderWidth:1,
    borderColor:'#18c5d9'
  },
  topPart:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  imageAndName:{
    flexDirection:'row',
    alignItems:'center'
  },
  middlePart:{

  },
  postImage:{
   
    justifyContent:'flex-start',
    height:400,
    width:400,
    left:0

  },
  avatar:{
    alignSelf:'center',
    height:50,
    width:50,
    margin: 10,
    borderRadius: 10
  },
  name:{
    fontSize:25,
    marginBottom:15,
    fontWeight:'bold',
    left:0
  },
  edit:{
    right:0
  },
  content:{
    fontStyle:'normal',
    fontSize:20,
  },
  
});

export default PostListRow;