import axios from "axios";
export class ApiService{
    static serUrl="http://localhost:9091/api/user";

    static getAllUsers(){
        return axios.get(this.serUrl)
    }

    static addUser(userList){
       return axios.post(this.serUrl,userList);
    }

    static update(userList,userId){
        let dataUrl=`${this.serUrl}/${userId}`;
        return axios.put(dataUrl,userList);
    }

    static GetUser(userId){
        let dataUrl=`${this.serUrl}/${userId}`;
        return axios.get(dataUrl);
    }
}