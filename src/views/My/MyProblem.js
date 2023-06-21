import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
import BackButton from "../../components/Button/BackButton";
import CreateNewProblemButton from "../../components/Button/CreateNewProblemButton";
import { hasSubstring } from "../../modules/search.module";
import {
	emitConfirmation,
	emitError,
	emitSuccess,
} from "../../modules/swal.module";
import { deleteProblem, getAllProblems } from "../../services/problem.service";
import { viewAllSubmissions } from "../../services/submission.service";
import PublishSwitch from "../../components/Switch/PublishSwitch";
import ActiveSwitch from "../../components/Switch/ActiveSwitch";
import Container from "../../components/Layout/Container";

const myProblemColumns = [
	{
		name: "Title",
		minWidth: "150px",
		maxWidth: "250px",
		selector: (row) => row.title,
		sortable: true,
	},
	{
		name: "Submission Count",
		// width: "200px",
		center: true,
		selector: (row) => Number(row.submission_count),
		sortable: true,
	},
	{
		name: "Publish",
		width: "100px",
		center: true,
		selector: (row) => row.publish_switch,
	},
	{
		name: "Active",
		width: "100px",
		center: true,
		selector: (row) => row.active_switch,
	},
	{
		name: "",
		right: true,
		minWidth: "400px",
		selector: (row) => row.button_row,
	},
];

const MyProblem = () => {
	const account_id = Number(localStorage.getItem("account_id"));
	const nevigate = useNavigate();

	const [allSubmissions, setallSubmissions] = useState([]);

	const [myProblems, setmyProblems] = useState([]);
	const [filteredProblems, setfilteredProblems] = useState([]);

	const [myProblemsSearch, setmyProblemsSearch] = useState("");

	const loadProblems = useCallback(() => {
		getAllProblems({
			get_deactive: true,
			get_private: true,
			account_id: account_id,
		}).then((response) => {
			setmyProblems(response.data.result);
		});
	}, [setmyProblems, account_id]);

	const handleDeleteProblem = useCallback(
		(problem) => {
			emitConfirmation(
				`Are you sure that you want to delete "${problem.title}" ?`,
				() => {
					deleteProblem(problem.problem_id)
						.then(() => {
							loadProblems();
							emitSuccess("Successfully deleted this Problem");
						})
						.catch(() => {
							emitError("Failed to delete this Problem");
						});
				}
			);
		},
		[loadProblems]
	);

	useEffect(() => {
		loadProblems();
		viewAllSubmissions({ sort_date: 1 }).then((response) => {
			setallSubmissions(response.data.result);
		});
	}, [account_id, loadProblems]);

	useEffect(() => {
		setfilteredProblems(
			myProblems
				.filter((prob) => hasSubstring(prob.title, myProblemsSearch))
				.map((problem) => ({
					...problem,
					publish_switch: (
						<PublishSwitch
							isPrivate={problem.is_private}
							problemId={problem.problem_id}
						/>
					),
					active_switch: (
						<ActiveSwitch
							isActive={problem.is_active}
							problemId={problem.problem_id}
						/>
					),
					button_row: (
						<div className="flex space-x-4">
							<div className="hidden 2xl:block">
								<Button
									onClick={() =>
										nevigate(
											`/my/problems/${problem.problem_id}`
										)
									}
									className="text-white"
									color="info"
								>
									<FontAwesomeIcon
										icon={faPencil}
										className="mr-2"
									/>
									Edit
								</Button>
							</div>
							<div className="2xl:hidden">
								<Button
									onClick={() =>
										nevigate(`/edit/${problem.problem_id}`)
									}
									className="text-white"
									color="info"
								>
									<FontAwesomeIcon
										icon={faPencil}
										className="mr-2"
									/>
									Edit
								</Button>
							</div>

							<div className="hidden 2xl:block">
								<Button
									onClick={() =>
										nevigate(
											`/problems/${problem.problem_id}`
										)
									}
									className="text-white"
									color="success"
								>
									<FontAwesomeIcon
										icon={faEye}
										className="mr-2"
									/>
									View
								</Button>
							</div>
							<div className="2xl:hidden">
								<Button
									onClick={() =>
										nevigate(
											`/problems/${problem.problem_id}`
										)
									}
									className="text-white"
									color="success"
								>
									<FontAwesomeIcon
										icon={faEye}
										className="mr-2"
									/>
									View
								</Button>
							</div>

							<div className="hidden 2xl:block">
								<Button
									onClick={() => handleDeleteProblem(problem)}
									className="text-white"
									color="danger"
								>
									<FontAwesomeIcon
										icon={faTrash}
										className="mr-2"
									/>
									Delete
								</Button>
							</div>
							<div className="2xl:hidden">
								<Button
									onClick={() => handleDeleteProblem(problem)}
									className="text-white"
									color="danger"
								>
									<FontAwesomeIcon
										icon={faTrash}
										className="mr-2"
									/>
									Delete
								</Button>
							</div>
						</div>
					),
					submission_count: allSubmissions.filter(
						(sub) => sub.problem_id === problem.problem_id
					).length,
				}))
		);
	}, [
		myProblems,
		nevigate,
		myProblemsSearch,
		allSubmissions,
		handleDeleteProblem,
	]);

	return (
		<Container>
			<BackButton to={"/my"} />

			{/*------------ MY PROBLEMS ------------*/}
			<div className="mb-5">
				<Row className="mb-1">
					<Col xs={6}>
						<h2>My Problems</h2>
					</Col>
					{/* <Col>
                        <SearchBar
                            value={myProblemsSearch}
                            onChange={(e) =>
                                setmyProblemsSearch(e.target.value)
                            }
                        />
                    </Col> */}
					<Col className="">
						<Input
							value={myProblemsSearch}
							onChange={(e) =>
								setmyProblemsSearch(e.target.value)
							}
							className="mb-2"
						/>
					</Col>
					<Col xs={2}>
						<CreateNewProblemButton />
					</Col>
				</Row>

				<DataTable
					// selectableRows
					className="text-md border-2"
					columns={myProblemColumns}
					data={filteredProblems}
					pagination
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
			</div>
		</Container>
	);
};
export default MyProblem;
