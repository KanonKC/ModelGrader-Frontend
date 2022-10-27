import axios from "axios";
import { URL } from "./constant.service";

export function createProblem(body){
    return axios.post(`${URL}/api/accounts/${localStorage.getItem('account_id')}/problems`,body)
}

export function getProblem(id){
    return axios.get(`${URL}/api/problems/${id}`)
}

export function getAllProblems(){
    return axios.get(`${URL}/api/problems`)
}