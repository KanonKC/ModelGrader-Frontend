import React, { useState } from "react";
import { Button, Card, Col, Row, Table } from "reactstrap";
import { formatDate } from "../../modules/date.module";
import { getSubmissionDetail } from "../../services/submission.service";

const SubmissionCard = ({ cardClassName = "", submission }) => {
	const [displayDetail, setDisplayDetail] = useState(false);
	const [submissionDetail, setSubmissionDetail] = useState([]);

	const handleSubmissionDetail = async () => {
		if (submissionDetail.length === 0) {
			const response = await getSubmissionDetail(
				submission.submission_id
			);
			setSubmissionDetail(response.data);
		}
		setDisplayDetail(!displayDetail);
	};

	return (
		<Card className={"py-2 px-3 " + cardClassName}>
			<Row>
				<Col>
					<span className="text-base">
						{formatDate(submission.date)}
					</span>
				</Col>
				<Col>
					<span className="text-base">
						{submission.account?.username}
					</span>
				</Col>
				<Col>
					<span className="text-base">
						{submission.problem?.title}
					</span>
				</Col>
				<Col>
					<span className="text-base font-mono">
						{submission.result}
					</span>
				</Col>
				<Col>
					<Button onClick={handleSubmissionDetail} color="info">
						View Detail
					</Button>
				</Col>
			</Row>

			{displayDetail && (
				<Table bordered className="mt-2">
					<thead>
						<tr>
							<th className="text-base">Input</th>
							<th className="text-base">Output</th>
							<th className="text-base">Expected Output</th>
							<th className="text-base">Result</th>
						</tr>
					</thead>

					<tbody>
						{submissionDetail.testcases?.map((testcase, i) => (
							<tr>
								<th className="font-mono text-sm font-light">
									{String.raw`${testcase.input}`}
								</th>
								<th className="font-mono text-sm font-light">
									{String.raw`${submissionDetail.submission_output[i]?.output}`}
								</th>
								<th className="font-mono text-sm font-light">
									{String.raw`${testcase.output}`}
								</th>
								<th className="font-mono text-sm font-light">
									{submissionDetail.submission_output[i]
										?.is_passed
										? "P"
										: "-"}
								</th>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Card>
	);
};

export default SubmissionCard;
