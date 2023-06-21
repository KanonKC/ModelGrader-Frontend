import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { getAllProblems } from "../services/problem.service";
import { hasSubstring } from "../modules/search.module";
import { viewAllSubmissions } from "../services/submission.service";
import { getAuthorization } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ProblemsTable from "../components/Table/ProblemsTable";
import { AuthContext } from "../App";
import Container from "../components/Layout/Container";

const AllProblem = () => {
	const nevigate = useNavigate();
	const account_id = Number(localStorage.getItem("account_id"));
	const [isLoggin, setisLoggin] = useContext(AuthContext);

	const [allProblems, setAllProblems] = useState([]);
	const [allSubmissions, setallSubmissions] = useState([]);
	const [displayProblems, setdisplayProblems] = useState([]);

	const [search, setsearch] = useState("");

	useEffect(() => {
		getAllProblems({
			get_private: false,
			get_deactive: false,
		}).then((response) => {
			setAllProblems(response.data.result);
		});
	}, []);

	useEffect(() => {
		getAuthorization().then((response) => {
			setisLoggin(response.data.result);
		});
	}, [allProblems, setisLoggin]);

	useEffect(() => {
		if (isLoggin && account_id) {
			viewAllSubmissions({
				account_id: account_id,
				sort_score: 1,
			}).then((response) => {
				setallSubmissions(response.data.result);
			});
		}
	}, [account_id, isLoggin]);

	useEffect(() => {
		try {
			const filterProblems = allProblems.filter(
				(problem) =>
					(hasSubstring(problem.title, search) ||
						hasSubstring(problem.language, search) ||
						hasSubstring(problem.creator.username, search)) &&
					!problem.is_private
			);
			setdisplayProblems(
				filterProblems.map((problem) => {
					let best_submission = allSubmissions.filter(
						(submission) =>
							submission.problem.problem_id === problem.problem_id
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
												`/problems/${problem.problem_id}`
											)
										}
										className="text-white"
										color="success"
									>
										<FontAwesomeIcon icon={faPuzzlePiece} />{" "}
										Solve This Problem
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
										<FontAwesomeIcon icon={faPuzzlePiece} />{" "}
										Solve
									</Button>
								</div>
							</div>
						),
						pass_status: best_submission ? (
							best_submission.is_passed ? (
								<img
									src={require("../imgs/passed_icon.png")}
									alt="Passed"
								/>
							) : (
								<img
									src={require("../imgs/unpassed_icon.png")}
									alt="Failed"
								/>
							)
						) : (
							""
						),
					};
				})
			);
		} catch (err) {}
	}, [allProblems, allSubmissions, search, nevigate]);

	return (
		<Container>
			<Row className="">
				<Col>
					<h1>All Problem</h1>
				</Col>
				<Col xs={4}>
					<SearchBar
						value={search}
						onChange={(e) => setsearch(e.target.value)}
					/>
				</Col>
			</Row>

			<div className="problem-card-list">
				<ProblemsTable
					problems={displayProblems}
					submissions={allSubmissions}
				/>
			</div>
		</Container>
	);
};

export default AllProblem;
