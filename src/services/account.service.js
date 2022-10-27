import axios from "axios";
import { URL } from "./constant.service";

export function register(body){
    return axios.post(`${URL}/api/accounts`,body)
}

export function getAccount(id){
    return axios.get(`${URL}/api/accounts/${id}`)
}