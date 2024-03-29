import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProblem } from "../services/problem.service";
import ReactMarkdown from "react-markdown";
import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
	Tooltip,
} from "reactstrap";
import {
	submitProblem,
	viewAllSubmissions,
} from "../services/submission.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import rehypeRaw from "rehype-raw";
import { faCheck, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { formatDate } from "../modules/date.module";
import { descriptionFormatter } from "../modules/markdown.module";
import BackButton from "../components/Button/BackButton";
import { ColorSubmissionLetter } from "../constants/submission.constant";

const Problem = () => {
	const { problem_id } = useParams();
	const account_id = Number(localStorage.getItem("account_id"));

	const nevigate = useNavigate();

	const [PROBLEM, setPROBLEM] = useState({});
	const [submissionCode, setSubmissionCode] = useState("");
	const [submissionResult, setSubmissionResult] = useState({});
	const [recentSubmitted, setRecentSubmitted] = useState({});
	const [isShowSub, setIsShowSub] = useState(false);
	const [loadingSub, setLoadingSub] = useState(false);
	const [textRow, setTextRow] = useState(5);

	const [recentOption, setrecentOption] = useState([]);

	const [tooltipOpen, setTooltipOpen] = useState(false);
	const toggle = () => setTooltipOpen(!tooltipOpen);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsShowSub(true);
		setLoadingSub(true);

		submitProblem(problem_id, e.target.code.value).then((response) => {
			setSubmissionResult(response.data);
			setLoadingSub(false);
		});
	};

	const handleTextChange = (e) => {
		e.preventDefault();
		setSubmissionCode(e.target.value);
	};

	const handlePreviousSubmission = (e) => {
		setSubmissionCode(e.value.code);
		setSubmissionResult({ result: e.value.result });
		setIsShowSub(true);
	};

	// Get Recent Submitted
	useEffect(() => {
		viewAllSubmissions({
			problem_id: problem_id,
			account_id: localStorage.getItem("account_id"),
			sort_date: 1,
		}).then((response) => {
			setRecentSubmitted(response.data);
		});
	}, [problem_id]);

	useEffect(() => {
		try {
			let index = 0;
			let max_score = 0;
			let option = [];
			for (let i in recentSubmitted.result) {
				if (recentSubmitted.result[i].score > max_score) {
					max_score = recentSubmitted.result[i].score;
					index = i;
				}
				option.push({
					label: `${formatDate(recentSubmitted.result[i].date)} ${
						recentSubmitted.result[i].result
					}`,
					value: {
						code: recentSubmitted.result[i].submission_code,
						result: recentSubmitted.result[i].result,
					},
				});
			}
			setrecentOption([
				{
					label: "Best Submission",
					options: [
						{
							label: `${formatDate(
								recentSubmitted.result[index].date
							)} ${recentSubmitted.result[index].result}`,
							value: {
								code: recentSubmitted.result[index]
									.submission_code,
								result: recentSubmitted.result[index].result,
							},
						},
					],
				},
				{
					label: "Previous Submission",
					options: option,
				},
			]);
		} catch (err) {}
	}, [recentSubmitted]);

	useEffect(() => {
		const total_row = submissionCode.split("\n").length;
		if (total_row <= 10) {
			setTextRow(10);
		} else if (total_row >= 20) {
			setTextRow(20);
		} else {
			setTextRow(total_row);
		}
	}, [submissionCode]);

	useEffect(() => {
		getProblem(problem_id)
			.then((response) => {
				setPROBLEM(response.data);
			})
			.catch(() => {
				setPROBLEM({
					title: "Not Found!",
				});
			});
	}, [problem_id]);

	return (
		<div className="problem-views pt-10 md:pt-24">
			<BackButton to={"/problems"} />
			<h1> {PROBLEM.title} </h1>
			<h4>
				<i>
					Created By{" "}
					<span style={{ color: "#ff8400" }}>
						{PROBLEM.creator && PROBLEM.creator.username}
					</span>
				</i>
			</h4>

			<div className="my-5">
				<ReactMarkdown rehypePlugins={[rehypeRaw]}>
					{descriptionFormatter(PROBLEM.description)}
				</ReactMarkdown>
			</div>

			<Form className="my-10" onSubmit={(e) => handleSubmit(e)}>
				<FormGroup row>
					<Label for="code">
						<h3 className="">
							Submit Your Code{" "}
							<img
								alt="submission-letter-tooltip"
								id="submission-letter-tooltip"
								width={20}
								height={20}
								className="ml-2 inline"
								src={require("./../imgs/info.png")}
							/>
						</h3>
					</Label>
					<Row>
						<Col>
							{isShowSub ? (
								<div>
									{loadingSub ? (
										<div>
											<div
												className="spinner-border text-warning ml-10 mr-3"
												role="status"
											>
												<span class="visually-hidden"></span>
											</div>
											Grading...
										</div>
									) : (
										<h5>
											Recent Submission Result:
											<span className="ml-1 font-mono text-red-600">
												{submissionResult.result
													.split("")
													.map((letter) => (
														<span
															style={{
																color: ColorSubmissionLetter[
																	letter
																],
															}}
														>
															{letter}
														</span>
													))}
											</span>
										</h5>
									)}
								</div>
							) : (
								<></>
							)}
						</Col>
						<Col>
							<Select
								onChange={(e) => handlePreviousSubmission(e)}
								options={recentOption}
								className="pb-3 text-base font-mono"
								placeholder="Previous Submission"
							/>
						</Col>
					</Row>
					<Input
						className="input-code"
						rows={textRow}
						value={submissionCode}
						onChange={(e) => handleTextChange(e)}
						id="code"
						name="text"
						type="textarea"
					/>
				</FormGroup>

				<Row>
					{/* <Button
                            className="w-1/4 mr-10"
                            size="lg"
                            type="button"
                            disabled={loadingSub || recentSubmitted.count == 0}
                            onClick={getRecentSubmission}
                        >
                            <FontAwesomeIcon
                                icon={faArrowRotateLeft}
                                className="pr-2"
                            />
                            Recent Code
                        </Button> */}
					<Col>
						<Button
							size="lg"
							type="submit"
							color="primary"
							disabled={loadingSub}
							className="px-10"
						>
							<FontAwesomeIcon icon={faCheck} className="pr-2" />
							Submit
						</Button>
					</Col>
					<Col>
						{PROBLEM.account_id === account_id && (
							<Button
								onClick={() =>
									nevigate(`/my/problems/${problem_id}`)
								}
								size="lg"
								type="submit"
								color="info"
								disabled={loadingSub}
								className="px-10 text-white float-right"
							>
								<FontAwesomeIcon
									icon={faPencil}
									className="pr-2"
								/>
								Edit This Problem
							</Button>
						)}
					</Col>
					<Col xs={2}>
						<Button
							className="float-right"
							size="lg"
							type="button"
							color="danger"
							disabled={loadingSub}
							onClick={(e) => setSubmissionCode("")}
						>
							<FontAwesomeIcon icon={faTrash} className="pr-2" />
							Clear
						</Button>
					</Col>
				</Row>
			</Form>

			<Tooltip
				isOpen={tooltipOpen}
				toggle={toggle}
				target="submission-letter-tooltip"
				placement="right"
			>
				<p>
					<b className="text-orange-500">P (Passed)</b> - โค้ดทำงานได้
					และได้คำตอบที่ถูกต้อง
				</p>
				<p>
					<b className="text-orange-500">- (Failed)</b> - โค้ดทำงานได้
					แต่ให้คำตอบที่ผิด
					ตรวจสอบให้แน่ใจว่าไม่มีตัวอักษรตัวไหนตกหล่น หรือพิมพ์ผิดไป
					และเข้าใจโจทย์อย่างถูกต้อง
				</p>
				<p>
					<b className="text-orange-500">E (Error)</b> - โค้ดเกิดการ
					Error ระหว่างทำงาน ลองตรวจสอบความถูกต้องของโค้ดใหม่
				</p>
				<p>
					<b className="text-orange-500">T (Timeout)</b> -
					โค้ดใช้เวลาทำงานนานเกินกำหนด ลองตรวจสอบดึๆ
					ว่ามีส่วนไหนของโค้ดที่ทำให้โปรแกรมมค้างหรือไม่
					หรือไม่ก็ลองออกแบบโค้ดใหม่ให้ทำงานได้เร็วขึ้น
				</p>
			</Tooltip>
		</div>
	);
};

export default Problem;
