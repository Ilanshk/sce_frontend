import { create } from "apisauce";
const apiClient = create({
baseURL: 'http://192.168.56.1:3000', //change here to the IP Address of your machine
headers: { 
    Accept: 'application/vnd.github.v3+json',
    Authorization: '',
},
})
export default apiClient;