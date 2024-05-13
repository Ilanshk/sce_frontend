import PostApi from "../Api/PostApi";
import FormData from 'form-data';

export type Student = {
    name: string,
    _id: string,
    imageUrl: string
}

const data: Student[] = [
  {
  _id:"1",
  name:"abc",
  imageUrl:"../assets/avatar.png"
},
{
  _id:"2",
  name:"ab",
  imageUrl:"../assets/avatar.png"
},
{
  _id:"3",
  name:"abce",
  imageUrl:"../assets/avatar.png"
},
{
  _id:"4",
  name:"abbbbc",
  imageUrl:"../assets/avatar.png"
},
{
  _id:"5",
  name:"ERT",
  imageUrl:"../assets/avatar.png"
},
{
  _id:"6",
  name:"QWA",
  imageUrl:"../assets/avatar.png"
},
{
  _id:"7",
  name:"SHO",
  imageUrl:"../assets/avatar.png"
},
{
  _id:"8",
  name:"NKI",
  imageUrl:"../assets/avatar.png"
}
];

const getAllStudents = async(accessToken:string) =>{
  console.log("get all students")
  console.log("access token received: "+accessToken)
  try{
    const responseStudents:any = await PostApi.getAllStudents(accessToken);
    console.log("Post Model - getAllStudents()"+responseStudents.data);
    
    let students = Array<Student>();
    //console.log("aaa",responseStudents);
    
    if(responseStudents.data){
      responseStudents.data.forEach((s:Student)=>{
        const student: Student = {
          name:s.name,
          _id:s._id,
          imageUrl:s.imageUrl
        }
        students.push(student);
      });
    }
    return students; 
  }catch(err){
    console.log("Failed Reading Posts from server: "+err);
    return Array<Student>();
  }
  
}

const getStudentById = async(id:string) =>{
    console.log("trying to find...");
    const studentResponse = await PostApi.getStudentById(id);
    return studentResponse.data;
}

const addStudent = async(student:Student) =>{
    console.log('addStudent');
    const data = {
      _id:student._id,
      name:student.name,
      imageUrl:student.imageUrl
    }
    try{
      const res = await PostApi.addStudent(data);
    }catch(err){
      console.log("add student failed");
    }
}

const deleteStudent = (id:string)=>{
    const index = data.findIndex((student) => student._id == id);
    if(index!= -1){
        data.splice(index,1);
    }
}

const uploadImage = async(imageUri:string) =>{
  let body = new FormData();
  body.append('file', {name:'name',type:'image/jpeg',uri: imageUri});
  try{
    const res = await PostApi.uploadImage(body);
    if(!res.ok){
      console.log("save failed " + res.problem);
    }else{
      if(res.data){
        const d:any = res.data;
        console.log(">>>>url = "+d.url)
        return d.url;
      }
    }
  }catch(err){
    console.log("save failed with error: " + err);
  }
  return "";
}


export default {getAllStudents,getStudentById,addStudent,deleteStudent,uploadImage};