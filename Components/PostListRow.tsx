import { StyleSheet,Button, Text, View, Image,Alert, TouchableOpacity, Pressable,Platform, TextInput,StatusBar, TouchableHighlight,Modal } from 'react-native';
import React,{FC, useEffect, useState,useRef} from 'react';
import userModel from '../Model/userModel';
import { Entypo } from '@expo/vector-icons';
import PostModel,{Post} from '../Model/PostModel';
import { MaterialIcons } from '@expo/vector-icons';


const PostListRow:FC<
    {idPostOwner:string,
    idPost:string,
    imgUrl:string,
    content:string,
    // onItemSelected:(id:string)=>void,
    getFullName:(userId:string)=>Promise<string|undefined>,
    getUserImgUrl:(userId:string)=>Promise<string|undefined>,
    setUserPosts:React.Dispatch<React.SetStateAction<Post[]>>
    isHomePage:boolean,
    isUserPostsPage:boolean,
    accessToken:string

    
    }
    >=({idPostOwner,idPost,imgUrl,content,getFullName,getUserImgUrl,setUserPosts,isHomePage,isUserPostsPage,accessToken})=>{

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
          const saveResponse = await PostModel.updatePost(idPost,postContent);
          if(saveResponse.ok){
            Alert.alert('Changes Saved');
            setIsEdit(false);
          }
      }

      const onDelete = async() =>{
          Alert.alert("Delete","Are you sure you want to delete this Post?",
            [{text:"Yes",onPress:async()=> {
              const deleteResponse = await PostModel.deletePost(idPost);
              if(deleteResponse?.ok){
                Alert.alert('Delete',"The post was deleted",[{text:"Close"}]);
                const postsNow = await PostModel.getAllPosts(accessToken);
                setUserPosts(postsNow);
              }
              else{
                Alert.alert('Error',deleteResponse?.problem);
              }}},
             {text:"No, I changed my mind"}]
          );
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
                {isUserPostsPage && <View>
                  <Entypo style={styles.edit} name="edit" size={24} color="black" onPress={activateContentField}/>
                  <MaterialIcons name="delete" size={24} color="black" onPress={onDelete}/>
                </View>}
              </View>

              <View style={styles.middlePart}>
                <TextInput 
                  style={styles.content}
                  editable={true}
                  ref={postContentRef}
                  onChangeText={setPostContent}
                  
                  >
                  {content}</TextInput>
                  {isEdit && <View style={styles.buttons}>
                  <TouchableOpacity style={styles.saveBtn}>
                    <Button title="Save Changes" onPress = {onSave}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelBtn}>
                    <Button title="Cancel" onPress={()=>setIsEdit(false)}></Button>
                  </TouchableOpacity>
                  </View>}
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
  buttons:{
    flexDirection: 'row',
    justifyContent:'space-evenly',
    top:5
  },
  saveBtn:{
    backgroundColor:'green'

  },
  cancelBtn:{
    backgroundColor:'red'

  },
  
  
});

export default PostListRow;