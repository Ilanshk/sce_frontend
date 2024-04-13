export type Student = {
    name: string,
    id: string,
    imageUrl: string
}

const data: Student[] = [{
  id:"1",
  name:"abc",
  imageUrl:"../assets/avatar.png"
},
{
  id:"2",
  name:"ab",
  imageUrl:"../assets/avatar.png"
},
{
  id:"3",
  name:"abce",
  imageUrl:"../assets/avatar.png"
},
{
  id:"4",
  name:"abbbbc",
  imageUrl:"../assets/avatar.png"
},
{
  id:"5",
  name:"ERT",
  imageUrl:"../assets/avatar.png"
},
{
  id:"6",
  name:"QWA",
  imageUrl:"../assets/avatar.png"
},
{
  id:"7",
  name:"SHO",
  imageUrl:"../assets/avatar.png"
},
{
  id:"8",
  name:"NKI",
  imageUrl:"../assets/avatar.png"
}
];

const getAllStudents = () :Student[] =>{
    return data;
}

const getStudent = (id:string): Student | undefined =>{
    return data.find((student) => student.id == id)
}

const addStudent = (student:Student) =>{
    data.push(student)
}

const deleteStudent = (id:string)=>{
    const index = data.findIndex((student) => student.id == id);
    if(index!= -1){
        data.splice(index,1);
    }
}
export default {getAllStudents,getStudent,addStudent,deleteStudent};