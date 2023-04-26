import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
import BackButton from "../../components/Button/BackButton";
import CreateNewProblemButton from "../../components/Button/CreateNewProblemButton";
import SearchBar from "../../components/SearchBar";
import { Language } from "../../constants/language.constant";
import { formatDate } from "../../modules/date.module";
import { hasSubstring } from "../../modules/search.module";
import { emitError, emitSuccess } from "../../modules/swal.module";
import { openComfirmation } from "../../redux/confirmation.reducer";
import {
	deleteMultipleProblem,
	getAllProblems,
} from "../../services/problem.service";
import { viewAllSubmissions } from "../../services/submission.service";
import PublishSwitch from "../../components/Switch/PublishSwitch";

const myProblemColumns = [
	{
		name: "Title",
		selector: (row) => row.title,
		sortable: true,
	},
	{
		name: "Language",
		width: "150px",
		selector: (row) => Language[row.language],
		sortable: true,
	},
	{
		name: "Submission Count",
		width: "200px",
		center: true,
		selector: (row) => Number(row.submission_count),
		sortable: true,
	},
	{
		name: "Publish",
		center: true,
		selector: (row) => row.publish_switch,
	},
	{
		name: "",
		right: true,
		width: "200px",
		selector: (row) => row.edit_button,
	},
	{
		name: "",
		selector: (row) => row.view_button,
	},
];

const MyProfile = () => {
	const account_id = Number(localStorage.getItem("account_id"));
	const nevigate = useNavigate();
	const dispatch = useDispatch();

	const [allSubmissions, setallSubmissions] = useState([]);

	const [mySubmissions, setmySubmissions] = useState([]);
	const [filteredSubmissions, setfilteredSubmissions] = useState([]);

	const [myProblems, setmyProblems] = useState([]);
	const [filteredProblems, setfilteredProblems] = useState([]);

	const [selectedRow, setselectedRow] = useState([]);

	const [mySubmissionsSearch, setmySubmissionsSearch] = useState("");
	const [myProblemsSearch, setmyProblemsSearch] = useState("");

	const [search, setsearch] = useState(null);

	const handleDeleteProblem = () => {
		deleteMultipleProblem(selectedRow.map((problem) => problem.problem_id))
			.then((response) => {
				setfilteredProblems(
					filteredProblems.filter(
						(problem) => !selectedRow.includes(problem)
					)
				);
				emitSuccess("Your problems have been deleted!");
			})
			.catch((err) => {
				emitError("Something went wrong! Please try again");
			});
	};

	useEffect(() => {
		getAllProblems().then((response) => {
			setmyProblems(
				response.data.result.filter(
					(problem) => problem.account_id === account_id
				)
			);
		});
		viewAllSubmissions({ sort_date: 1 }).then((response) => {
			setallSubmissions(response.data.result);
			setmySubmissions(
				response.data.result.filter(
					(submission) => submission.account_id === account_id
				)
			);
		});
	}, [account_id]);

	useEffect(() => {
		setfilteredSubmissions(
			mySubmissions
				.filter(
					(sub) =>
						hasSubstring(sub.problem.title, mySubmissionsSearch) ||
						hasSubstring(
							String(sub.problem_id),
							mySubmissionsSearch
						)
				)
				.map((submission) => ({
					...submission,

					status_icon: submission.is_passed ? (
						<img
							alt=""
							src={require(`../../imgs/passed_icon.png`)}
						/>
					) : (
						""
					),
					view_button: (
						<Button
							onClick={() =>
								nevigate(`/problems/${submission.problem_id}`)
							}
							className="text-white"
							color="success"
						>
							<FontAwesomeIcon icon={faEye} className="mr-2" />
							View Problem
						</Button>
					),
				}))
		);
	}, [mySubmissions, nevigate, mySubmissionsSearch]);

	useEffect(() => {
		setselectedRow([]);
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
					edit_button: (
						<>
							{console.log(
								problem.problem_id,
								problem.is_private
							)}
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
									Edit Problem
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
						</>
					),
					view_button: (
						<>
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
									View Problem
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
						</>
					),
					submission_count: allSubmissions.filter(
						(sub) => sub.problem_id === problem.problem_id
					).length,
				}))
		);
	}, [myProblems, nevigate, myProblemsSearch, allSubmissions]);

	return (
		<div className="pt-10 md:pt-24">
			<BackButton to={"/my"} />

			{/*------------ MY PROBLEMS ------------*/}
			<div className="mb-5">
				<Row className="mb-1">
					<Col>
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
					<Col xs={4} className="mt-1 flex justify-end">
						<div>
							<Input
								value={myProblemsSearch}
								onChange={(e) =>
									setmyProblemsSearch(e.target.value)
								}
								className="mb-2"
							/>
							<CreateNewProblemButton />
							<Button
								disabled={selectedRow.length === 0}
								onClick={() =>
									dispatch(
										openComfirmation({
											message:
												"Are you sure do you want to delete those problems?",
											onConfirm: handleDeleteProblem,
										})
									)
								}
								className="text-white ml-1"
								color="danger"
							>
								<FontAwesomeIcon
									icon={faTrash}
									className="mr-2"
								/>
								{selectedRow.length === 0
									? "Delete Problem"
									: `Delete Problem (${selectedRow.length})`}
							</Button>
						</div>
					</Col>
				</Row>

				<DataTable
					selectableRows
					onSelectedRowsChange={(e) => setselectedRow(e.selectedRows)}
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
		</div>
	);
};
export default MyProfile;
