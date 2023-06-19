import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { Language } from "../../constants/language.constant";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";

const columns = [
	{
		name: "Title",
		minWidth: "200px",
		maxWidth: "250px",
		selector: (row) => row.title,
		sortable: true,
	},
	{
		name: "Language",
		maxWidth: "130px",
		selector: (row) => Language[row.language],
		sortable: true,
	},

	{
		name: "Status",
		center: true,
		maxWidth: "100px",
		selector: (row) => row.pass_status,
		sortable: false,
	},

	{
		name: "Best Submission",
		center: true,
		selector: (row) => (
			<span className="font-mono">{row.best_submission_result}</span>
		),
		sortable: false,
	},

	// {
	//     name: "Created By",
	//     maxWidth: "130px",
	//     selector: (row) => row.creator.username,
	//     sortable: true,
	// },

	{
		name: "",
		selector: (row) => row.solve_button,
	},
];

// const noSubmissionColumns = [
// 	{
// 		name: "Title",
// 		minWidth: "200px",
// 		selector: (row) => row.title,
// 		sortable: true,
// 	},
// ];

const ProblemsTable = ({
	problems,
	submissions = [],
	noPagination = false,
}) => {
	const nevigate = useNavigate();
	const [displayProblems, setdisplayProblems] = useState([]);

	useEffect(() => {
		try {
			if (submissions.length === 0) {
				setdisplayProblems(
					problems.map((problem) => {
						return {
							...problem,
							solve_button: (
								<div>
									<div className="hidden 2xl:block">
										<Button
											onClick={() =>
												nevigate(
													`./${problem.problem_id}`
												)
											}
											className="text-white"
											color="success"
										>
											<FontAwesomeIcon
												icon={faPuzzlePiece}
											/>{" "}
											Solve This Problem
										</Button>
									</div>
									<div className="2xl:hidden">
										<Button
											onClick={() =>
												nevigate(
													`./${problem.problem_id}`
												)
											}
											className="text-white"
											color="success"
										>
											<FontAwesomeIcon
												icon={faPuzzlePiece}
											/>{" "}
											Solve
										</Button>
									</div>
								</div>
							),
						};
					})
				);
			} else {
				setdisplayProblems(
					problems.map((problem) => {
						let best_submission = submissions.filter(
							(submission) =>
								submission.problem_id === problem.problem_id
						)[0];
						return {
							...problem,
							best_submission_result: best_submission
								? best_submission.result
								: "",
							best_submission_score: best_submission
								? `${best_submission.score}/${best_submission.result.length}`
								: "",
							solve_button: (
								<div>
									<div className="hidden 2xl:block">
										<Button
											onClick={() =>
												nevigate(
													`./${problem.problem_id}`
												)
											}
											className="text-white"
											color={
												best_submission?.is_passed
													? "secondary"
													: "success"
											}
										>
											<FontAwesomeIcon
												icon={faPuzzlePiece}
											/>{" "}
											Solve This Problem
										</Button>
									</div>
									<div className="2xl:hidden">
										<Button
											onClick={() =>
												nevigate(
													`./${problem.problem_id}`
												)
											}
											className="text-white"
											color={
												best_submission?.is_passed
													? "secondary"
													: "success"
											}
										>
											<FontAwesomeIcon
												icon={faPuzzlePiece}
											/>{" "}
											Solve
										</Button>
									</div>
								</div>
							),
							pass_status: best_submission ? (
								best_submission.is_passed ? (
									<img
										alt="passed_icon"
										src={require("../../imgs/passed_icon.png")}
									/>
								) : (
									<img
										alt="failed_icon"
										src={require("../../imgs/unpassed_icon.png")}
									/>
								)
							) : (
								""
							),
						};
					})
				);
			}
		} catch (err) {}
	}, [problems, submissions, nevigate]);

	return (
		<DataTable
			responsive
			className="text-md border-2"
			columns={columns}
			data={displayProblems}
			pagination={!noPagination}
			highlightOnHover
			customStyles={{
				headCells: {
					style: {
						fontSize: "16px",
					},
				},
				cells: {
					style: {
						fontSize: "16px",
						fontFamily: "monospace",
					},
				},
			}}
			striped
		/>
	);
};

export default ProblemsTable;
