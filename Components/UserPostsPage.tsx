import { FC, useState,useEffect } from "react";
import { View,Text, FlatList,StyleSheet,StatusBar,Pressable,Modal,Button, ActivityIndicator } from "react-native";
import PostModel, { Post } from "../Model/PostModel";
import PostListRow from "./PostListRow";
import userModel from "../Model/userModel";
import HeaderOptions from "./Menu";
import UserApi from "../Api/UserApi";



const UserPostsPage:FC<{navigation:any,route:any}> = ({navigation,route}) =>{
    const [userPosts,setUserPosts] = useState<Post[]>([]);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [dispalyActivityIndicator,setDisplayActivityIndicator] = useState(true);

    useEffect(()=>{
        const fetchPostsOfUser = async() =>{
            try{
                const posts:Post[] = await PostModel.getAllPosts(route.params.refreshToken);
                const filterdPosts:Post[] = posts.filter((post: Post) => post.owner == route.params.userId)
                setUserPosts(filterdPosts);
                //setDisplayActivityIndicator(false);
            }catch(error){
                console.log("Error in getting user's posts: "+error);  
            }
        }
        fetchPostsOfUser();
        navigation.setOptions({
            headerRight:()=>
                <HeaderOptions
                navigateToProfile={()=>navigation.navigate('ProfilePage',{id:route.params.userId,refreshToken:route.params.refreshToken})}
                logOutOfApp={()=>{
                    UserApi.logOutUser(route.params.refreshToken);
                    navigation.navigate('LogInPage');
                }}
                navigateToHome={()=>navigation.navigate('HomePage',{userId:route.params.userId,accessToken:route.params.accessToken,refreshToken:route.params.refreshToken})}
                />
        })
        //setDisplayActivityIndicator(false);
    },[navigation]) //route.params.userId

    const getFullName = async(id:string) =>{
        try{
            const response:any = await userModel.getUserById(route.params.userId);
            return response.firstName + " " + response.lastName;
        }catch(error){
            console.log("Error in getting posts of the user: "+error);   
        }
    }
    const getUserProfileImgUrl = async(userId: string) =>{
        try{
          const user = await userModel.getUserById(userId);
          return user.userImageUrl;
        }catch(error){
          console.log("Error retrieving user by id: "+error);
        }
      }

      setTimeout(()=> setDisplayActivityIndicator(false),3000);
   
    return(
        <View style={styles.userPosts}>
          {!dispalyActivityIndicator ? <View style={styles.userPosts}>
            <Text style={styles.helloMessage}>Hi,{route.params.userName}</Text>
            <Text>Here you can see all your posts</Text>
            {/* <Modal
            animationType='slide'
            visible={isModalVisible}
            onRequestClose={() =>setIsModalVisible(!isModalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text>Your Changes were saved</Text>
                <Pressable
                  onPress={() => setIsModalVisible(!isModalVisible)}>
                    <Button title="OK"/>
                </Pressable>
              </View>
            </View>
          </Modal> */}
            {userPosts.length!=0? <FlatList
                data={userPosts}
                keyExtractor={(post)=> post._id}
                renderItem={({item})=>
                    <PostListRow
                    idPostOwner={item.owner}
                    idPost={item._id}
                    imgUrl={item.postImageUrl}
                    content = {item.postText}
                    getFullName={getFullName}
                    getUserImgUrl={getUserProfileImgUrl}
                    setUserPosts ={setUserPosts}
                    isHomePage = {false}
                    isUserPostsPage = {true}
                    accessToken={route.params.refreshToken}
                    
                    ></PostListRow>
                }
                />
                :<Text>You don't have posts yet</Text>
            }
          </View> : <View style={styles.activityIndicator}><ActivityIndicator size={100}/></View>}
        </View>
    )
}

const styles = StyleSheet.create({
    userPosts:{
        flex:1,
        marginTop:StatusBar.currentHeight,
        //marginHorizontal:5,
        alignItems:'center'
    },
    helloMessage:{
        fontSize:25
    },
    centeredView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
      },
      activityIndicator:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
      }

})

export default UserPostsPage;