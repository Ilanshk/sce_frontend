import * as ImagePicker from 'expo-image-picker';
import StudentModel,{Student} from "../Model/PostModel"


const askCameraPermission = async() =>{
    try{
      const res= await ImagePicker.requestCameraPermissionsAsync();
        if(!res.granted){
          alert("You need to approve camera permission")
        }
    }catch(err){
      console.log("Ask Camera Permission Error:" +err)
    }
}


const activateCamera = async() =>{
    try{
      const response = await ImagePicker.launchCameraAsync();
      if(!response.canceled && response.assets.length > 0){
        const uri = response.assets[0].uri;
        console.log("activateCamera()-uri= "+uri);
        //setImageUrl(uri);
        return uri;
      }
    }catch(err){
      console.log("Error while opening device camera: "+err);
      
    }
    
  }

const openGallery = async() =>{
    try{
      const response = await ImagePicker.launchImageLibraryAsync();
      if(!response.canceled && response.assets.length > 0){
        const uri = response.assets[0].uri;
        //setImageUrl(uri);
        return uri;
      }
    }catch(err){
      console.log("Error while opening device camera: "+err);
      
    }
}


const onSave = async(imgUrl:string) =>{
    console.log('save button was pressed');
    const student: Student = {
        name:"",
        _id:"",
        imageUrl:""
    }
    try{
      if(student.imageUrl == ""){
        console.log("uploading image");
        const url = await StudentModel.uploadImage(imgUrl);
        student.imageUrl = url
        console.log("got url from upload at StudentAddPage: " + url);
        console.log("saving student");
        StudentModel.addStudent(student);
        return url;
      }
        //navigation.navigate('StudentList');
    }catch(err){
      console.log("Error in onSave() "+err);
      
    }
  }

export default {askCameraPermission,activateCamera,openGallery,onSave}