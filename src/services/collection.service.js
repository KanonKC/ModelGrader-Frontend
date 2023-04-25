import axios from "axios";
import { URL } from "./constant.service";
import { uploadImage } from "./filestack.service";

export async function createCollection(account_id,body){
    return axios.post(`${URL}/api/accounts/${account_id}/collections`,body)
}

export async function getCollection(collection_id){
    return axios.get(`${URL}/api/collections/${collection_id}`)
}

export async function getAllCollections({account_id}){
    let query = "?"
    if (account_id) query += `account=${account_id}&`
    return axios.get(`${URL}/api/collections` + query)
}

export async function updateCollection(collection_id,body){
    return axios.put(`${URL}/api/collections/${collection_id}`,body)
}

export async function updateCollectionImage(collection_id,image){
    const response = await uploadImage(image)
    return axios.get(`${URL}/api/collections/${collection_id}`,{
        image_url: response.data.url
    })
}

export async function addCollectionProblem(collection_id,problem_ids){
    return axios.put(`${URL}/api/collections/${collection_id}/problems`,{
        problem_ids: problem_ids
    })
}

export async function removeCollectionProblem(collection_id,problem_ids){
    return axios.delete(`${URL}/api/collections/${collection_id}/problems`,{
        problem_ids: problem_ids
    })
}