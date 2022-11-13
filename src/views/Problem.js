import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblem } from "../services/problem.service";
import ReactMarkdown from "react-markdown";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import {
    submitProblem,
    viewAllSubmissions,
} from "../services/submission.service";
import LinkButton from "../components/LinkButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
    faArrowRotateLeft,
    faCake,
    faCheck,
    faCoffee,
    faReply,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { formatDate } from "../modules/date.module";

const Problem = () => {
    const { problem_id } = useParams();
    const [PROBLEM, setPROBLEM] = useState({});
    const [submissionCode, setSubmissionCode] = useState("");
    const [submissionResult, setSubmissionResult] = useState({});
    const [recentSubmitted, setRecentSubmitted] = useState({});
    const [isShowSub, setIsShowSub] = useState(false);
    const [loadingSub, setLoadingSub] = useState(false);
    const [score, setScore] = useState(0);
    const [textRow, setTextRow] = useState(5);

    const [bestSubmission, setbestSubmission] = useState({});
    const [recentOption, setrecentOption] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsShowSub(true);
        setLoadingSub(true);

        submitProblem(problem_id, e.target.code.value).then((response) => {
            setSubmissionResult(response.data);
            setLoadingSub(false);
        });
    };

    const getRecentSubmission = () => {
        setSubmissionCode(
            recentSubmitted.result[recentSubmitted.result.length - 1]
                .submission_code
        );
    };

    const handleTextChange = (e) => {
        e.preventDefault();
        setSubmissionCode(e.target.value);
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
    }, []);

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
                    label: `${formatDate(recentSubmitted.result[i].date)} ${recentSubmitted.result[i].result}`,
                    value: recentSubmitted.result[i].submission_code,
                });
            }
            setbestSubmission(recentSubmitted.result[index]);
            setrecentOption([
                {
                    label: "Best Submission",
                    options: [{
                        label: `${formatDate(recentSubmitted.result[index].date)} ${recentSubmitted.result[index].result}`,
                        value: recentSubmitted.result[index].submission_code,
                    }]
                },
                {
                    label: "Previous Submission",
                    options: option
                },
    
            ])
        } catch (err) {}
    }, [recentSubmitted]);

    useEffect(() => {
        // setrecentOption([
        //     {
        //         label: "Best Submission",
        //         options: [{
        //             label: `${formatDate(bestSubmission.date)} ${bestSubmission.result}`,
        //             value: bestSubmission.submission_code,
        //         }]
        //     },
        //     {
        //         label: "Previous Submission",
        //         options: recentOption
        //     },

        // ])
        // setrecentOption([
        //     {
        //         label: `(Best Submission) ${formatDate(bestSubmission.date)} ${bestSubmission.result}`,
        //         value: bestSubmission.submission_code,
        //     },
        //     ...recentOption
        // ])
    },[bestSubmission])

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

    useEffect(() => {
        setScore(0);
        try {
            submissionResult.result.map((score) =>
                score === "P" ? setScore(score + 1) : ""
            );
        } catch (err) {}
    }, [submissionResult]);

    return (
        <div className="problem-views">
            <LinkButton
                label={
                    <>
                        <FontAwesomeIcon icon={faReply} className="pr-2" />
                        Back
                    </>
                }
                color="primary"
                className="mb-2"
                size="lg"
                to={"/problems"}
            />
            <h1> {PROBLEM.title} </h1>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {PROBLEM.description}
            </ReactMarkdown>
            <Form className="my-10" onSubmit={(e) => handleSubmit(e)}>
                <FormGroup row>
                    <Label for="code">
                        <h3>Submit Your Code</h3>
                        
                    </Label>
                    <Row>
                            {/* <Col xs={3}>
                                <h5>
                                    Best Submission: {bestSubmission ? [
                                    <span style={{ color: "red" }}>
                                        {bestSubmission.result}
                                    </span>
                                    ] : "[]"}
                                </h5>
                            </Col> */}
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
                                                <span className="ml-1" style={{ color: "red" }}>
                                                     {submissionResult.result}
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
                                    onChange={(e) => setSubmissionCode(e.value)}
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
                            color="warning"
                            disabled={loadingSub}
                            className="px-10"
                        >
                            <FontAwesomeIcon icon={faCheck} className="pr-2" />
                            Submit
                        </Button>
                    </Col>
                    <Col>
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
        </div>
    );
};

export default Problem;
