import React, { useEffect, useState } from "react";
import SubmissionCard from "../../../components/Card/SubmissionCard";
import { viewAllSubmissions } from "../../../services/submission.service";

const ViewTopicSubmission = ({ topic }) => {
	const [submissions, setSubmissions] = useState([]);

	useEffect(() => {
		console.log("Start");
		viewAllSubmissions({ sort_date: 1 }).then((response) => {
			setSubmissions(response.data.result);
			console.log("Done", response.data);
		});
	}, []);

	return (
		<div>
			<h1>View Submission</h1>

			<div>
				{submissions.map((submission) => (
					<SubmissionCard
						cardClassName={"my-2"}
						submission={submission}
					/>
				))}
			</div>
		</div>
	);
};

export default ViewTopicSubmission;
