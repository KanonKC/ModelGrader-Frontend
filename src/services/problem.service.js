import axios from "axios";
import { URL } from "./constant.service";

export function createProblem(body){
    return axios.post(`${URL}/api/accounts/${localStorage.getItem('account_id')}/problems`,body)
}

export function getProblem(problem_id){
    return axios.get(`${URL}/api/problems/${problem_id}`)
}

export function getAllProblems(){
    return axios.get(`${URL}/api/problems`)
}

export function editProblem(problem_id,body){
    return axios.put(`${URL}/api/problems/${problem_id}`,body)
}

export function deleteProblem(problem_id){
    return axios.delete(`${URL}/api/problems/${problem_id}`)
}

export function deleteMultipleProblem(problems_id){
    return axios.delete(`${URL}/api/problems`,{data:{problem: problems_id}})
}