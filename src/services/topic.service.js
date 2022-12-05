import axios from "axios";
import { URL } from "./constant.service";
import { uploadImage } from "./filestack.service";

export async function createTopic(account_id,body,image){
    const response = await uploadImage(image)
    body = {...body,image_url: response.data.url}
    return axios.post(`${URL}/api/accounts/${account_id}/topics`,body)
}

export function getTopic(topic_id){
    return axios.get(`${URL}/api/topics/${topic_id}`)
}

export function getAllTopics(){
    return axios.get(`${URL}/api/topics`)
}

export function updateTopic(topic_id,body){
    return axios.get(`${URL}/api/topics/${topic_id}`,body)
}

export async function updateTopicImage(topic_id,image){
    const response = await uploadImage(image)
    return axios.get(`${URL}/api/topics/${topic_id}`,{
        image_url: response.data.url
    })
}

export function addTopicProblem(topic_id,problems_id){
    return axios.put(`${URL}/api/topics/${topic_id}/problems`,{
        problems_id: problems_id
    })
}

export function removeTopicProblem(topic_id,problems_id){
    return axios.delete(`${URL}/api/topics/${topic_id}/problems`,{
        problems_id: problems_id
    })
}