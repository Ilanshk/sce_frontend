
import UserApi from "../Api/UserApi"

export type User = {
    _id: string,
    firstName:string,
    lastName:string,
    email: string,
    password: string,
    imageUrl: string
    userAge:String,
    userCountry:String
} 

const getUserName = async(userId:string) =>{
    const res:any = await UserApi.getUser(userId);
    return res.firstName + " " + res.lastName;
}

export default {getUserName}