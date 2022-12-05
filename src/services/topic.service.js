import axios from "axios";
import { FORM_HEADER, URL } from "./constant.service";
import { uploadImage } from "./filestack.service";

export async function createTopic(account_id,body,image){
    const response = await uploadImage(image)
    body = {...body,image_url: response.data.url}
    return axios.post(`${URL}/api/accounts/${account_id}/topics`,body)
}