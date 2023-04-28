import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import TrackerCard from "../../components/Card/TrackerCard";
import { getAccount } from "../../services/account.service";
import { getAllProblems } from "../../services/problem.service";
import { viewAllSubmissions } from "../../services/submission.service";

const MyProfile = () => {
	const account_id = Number(localStorage.getItem("account_id"));

	const [account, setaccount] = useState({});
	const [submissions, setsubmissions] = useState([]);
	const [problems, setproblems] = useState([]);

	const [submissionCount, setsubmissionCount] = useState(0);
	const [passedCount, setpassedCount] = useState(0);
	const [problemCount, setproblemCount] = useState(0);

	useEffect(() => {
		getAccount(account_id).then((response) => {
			setaccount(response.data);
		});
		viewAllSubmissions({ account_id: account_id }).then((response) => {
			setsubmissions(response.data.result);
		});
		getAllProblems().then((response) => {
			setproblems(
				response.data.result.filter(
					(problem) => problem.account_id === account_id
				)
			);
		});
	}, [account_id]);

	useEffect(() => {
		setsubmissionCount(submissions.length);
		const passedSubmissions = submissions.filter(
			(submission) => submission.is_passed
		);
		let result = [];
		for (let i in passedSubmissions) {
			if (!result.includes(passedSubmissions[i].problem_id)) {
				result.push(passedSubmissions[i].problem_id);
			}
		}
		setpassedCount(result.length);
	}, [submissions]);

	useEffect(() => {
		setproblemCount(problems.length);
	}, [problems]);

	return (
		<div className="pt-10 md:pt-24">
			<h1 className="mb-10">Welcome, {account.username}</h1>
			<Row className="mx-20">
				<Col>
					<TrackerCard
						color="danger"
						text="SUBMISSIONS"
						count={submissionCount}
						to="./submissions"
					/>
				</Col>
				<Col>
					<TrackerCard
						color="success"
						text="PASSED"
						count={passedCount}
						to="./submissions"
					/>
				</Col>
				<Col>
					<TrackerCard
						color="info"
						text="PROBLEMS"
						count={problemCount}
						to="./problems"
					/>
				</Col>
			</Row>
		</div>
	);
};
export default MyProfile;
