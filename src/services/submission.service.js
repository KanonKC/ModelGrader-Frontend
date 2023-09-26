import axios from "axios";
import { URL } from "./constant.service";

export function submitProblem(id, code) {
	const body = {
		submission_code: code,
	};
	return axios.post(
		`${URL}/api/problems/${id}/${localStorage.getItem("account_id")}`,
		body
	);
}

export function viewAllSubmissions({
	account_id,
	problem_id,
	passed,
	sort_date,
	sort_score,
}) {
	let query = "?";
	if (account_id) query += `account_id=${account_id}&`;
	if (problem_id) query += `problem_id=${problem_id}&`;
	if (passed) query += `is_passed=${passed}&`;
	if (sort_date) query += `sort_date=${sort_date}&`;
	if (sort_score) query += `sort_score=${sort_score}&`;
	return axios.get(`${URL}/api/submissions` + query);
}

export function getSubmissionDetail(submission_id) {
	return axios.get(`${URL}/api/submissions/${submission_id}`);
}
