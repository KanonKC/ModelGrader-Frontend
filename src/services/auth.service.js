import axios from "axios";
import { getAccount } from "./account.service";
import { URL } from "./constant.service";

export async function login(body){
    return axios.post(`${URL}/api/login`,body)
}

export function logout(){
    const body = {
        "account_id": localStorage.getItem('account_id'),
        "token": localStorage.getItem('token')
    }
    localStorage.removeItem('account_id')
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    return axios.post(`${URL}/api/logout`,body)
}

export function getAuthorization(){
    try{
        const body = {
            "account_id": localStorage.getItem('account_id'),
            "token": localStorage.getItem('token')
        }
        return axios.put(`${URL}/api/token`,body)
    }   
    catch(err){
        return false
    }
}