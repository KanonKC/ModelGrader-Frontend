import axios from "axios";
import { URL } from "./constant.service";
import { uploadImage } from "./filestack.service";

export async function createTopic(account_id, body) {
	return axios.post(`${URL}/api/accounts/${account_id}/topics`, body);
}

export async function getTopic(topic_id) {
	return axios.get(`${URL}/api/topics/${topic_id}`);
}

export async function getAllTopics(account_id) {
	let query = "?";
	if (account_id) query += `account_id=${account_id}&`;
	return axios.get(`${URL}/api/topics` + query);
}

export async function updateTopic(topic_id, body) {
	return axios.put(`${URL}/api/topics/${topic_id}`, body);
}

export async function updateTopicImage(topic_id, image) {
	const response = await uploadImage(image);
	return axios.get(`${URL}/api/topics/${topic_id}`, {
		image_url: response.data.url,
	});
}

export async function addTopicCollection(topic_id, collection_ids) {
	return axios.put(`${URL}/api/topics/${topic_id}/collections`, {
		collection_ids: collection_ids,
	});
}

export async function removeTopicCollection(topic_id, collection_ids) {
	return axios.delete(`${URL}/api/topics/${topic_id}/collections`, {
		collection_ids: collection_ids,
	});
}
