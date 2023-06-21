import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import BackButton from "../../components/Button/BackButton";
import SearchBar from "../../components/SearchBar";
import { Language } from "../../constants/language.constant";
import { formatDate } from "../../modules/date.module";
import { hasSubstring } from "../../modules/search.module";
import { viewAllSubmissions } from "../../services/submission.service";
import Container from "../../components/Layout/Container";

const mySubmissionColumns = [
	{
		name: "ID",
		maxWidth: "10px",
		selector: (row) => Number(row.submission_id),
		sortable: true,
	},
	{
		name: "Title",
		width: "135px",
		compact: true,
		selector: (row) => row.problem.title,
		sortable: true,
	},
	{
		name: "Language",
		maxWidth: "150px",
		selector: (row) => Language[row.problem.language],
		sortable: true,
	},
	{
		name: "Status",
		maxWidth: "15px",
		center: true,
		selector: (row) => row.status_icon,
		sortable: true,
	},
	{
		name: "Result",
		center: true,
		maxWidth: "200px",
		selector: (row) => row.result,
	},
	{
		name: "Sent Date",
		width: "301px",
		center: true,
		selector: (row) => formatDate(row.date),
	},
	{
		name: "",
		selector: (row) => row.view_button,
	},
];

const MySubmission = () => {
	const account_id = Number(localStorage.getItem("account_id"));
	const nevigate = useNavigate();

	const [mySubmissions, setmySubmissions] = useState([]);
	const [filteredSubmissions, setfilteredSubmissions] = useState([]);

	const [mySubmissionsSearch, setmySubmissionsSearch] = useState("");

	useEffect(() => {
		viewAllSubmissions({ sort_date: 1, account_id: account_id }).then(
			(response) => {
				setmySubmissions(response.data.result);
			}
		);
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
						<>
							<div className="hidden 2xl:block">
								<Button
									onClick={() =>
										nevigate(
											`/problems/${submission.problem.problem_id}`
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
											`/problems/${submission.problem.problem_id}`
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
				}))
		);
	}, [mySubmissions, nevigate, mySubmissionsSearch]);

	return (
		<Container>
			<BackButton to={"/my"} />
			{/*------------ MY SUBMISSIONS ------------*/}
			<div className="mb-5">
				<Row className="mb-1">
					<Col xs={8}>
						<h2>My Submissions</h2>
					</Col>
					<Col>
						<SearchBar
							value={mySubmissionsSearch}
							onChange={(e) =>
								setmySubmissionsSearch(e.target.value)
							}
						/>
					</Col>
				</Row>

				<DataTable
					responsive
					className="text-md border-2"
					columns={mySubmissionColumns}
					data={filteredSubmissions}
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
export default MySubmission;
