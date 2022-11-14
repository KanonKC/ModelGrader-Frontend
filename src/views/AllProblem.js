import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col, Input, Row } from "reactstrap";
import LinkButton from "../components/LinkButton";
import { getAllProblems } from "../services/problem.service";
import { hasSubstring } from "../modules/search.module";
import { viewAllSubmissions } from "../services/submission.service";
import { getAuthorization } from "../services/auth.service";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { Language } from "../constants/language.constant";

const columns = [
    {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
    },
    {
        name: "Language",
        selector: (row) => Language[row.language],
        sortable: true,
    },

    {
        name: "Status",
        center: true,
        selector: (row) => row.pass_status,
        sortable: false,
    },

    {
        name: "Score",
        center: true,
        selector: (row) => row.best_submission_score,
        sortable: false,
    },

    {
        name: "Best Submission",
        center: true,
        selector: (row) => <span className="font-mono">{row.best_submission_result}</span>,
        sortable: false,
    },
    

    {
        name: "Created By",
        selector: (row) => row.creator.username,
        sortable: true,
    },

    {
        name: "",
        selector: (row) => row.solve_button,
    },
];

const AllProblem = () => {
    const nevigate = useNavigate()
    const { account_id } = useParams()
    const [allProblems, setAllProblems] = useState([]);
    const [allSubmissions, setallSubmissions] = useState([]);
    const [isloggin, setisloggin] = useState(false);
    const [displayProblems, setdisplayProblems] = useState([]);

    const [search, setsearch] = useState("");

    useEffect(() => {
        getAllProblems().then((response) => {
            setAllProblems(response.data.result);
        });
    }, []);

    useEffect(() => {
        getAuthorization().then((response) => {
            setisloggin(response.data.result);
        });
    }, [allProblems]);

    useEffect(() => {
        if(isloggin){
            viewAllSubmissions({
                account_id: account_id,
                sort_score: 1,
            }).then((response) => {
                setallSubmissions(response.data.result);
            });
        }
    }, [account_id,isloggin]);

    useEffect(() => {
        try {
            const filterProblems = allProblems.filter(
                (problem) =>
                    hasSubstring(problem.title, search) ||
                    hasSubstring(problem.language, search) ||
                    hasSubstring(problem.creator.username, search)
            );
            setdisplayProblems(
                filterProblems.map((problem) => {
                    let best_submission = allSubmissions.filter(
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
                        solve_button: <Button onClick={() => nevigate(`/problems/${problem.problem_id}`)} className="text-white" color="success">Solve This Problem</Button>,
                        pass_status: best_submission ? (best_submission.is_passed ? <img src={require("../imgs/passed_icon.png")}/> : <img src={require("../imgs/unpassed_icon.png")}/>) : ""
                    };
                })
            );
        } catch (err) {}
    }, [allProblems,allSubmissions,search,nevigate]);

    return (
        <div className="mt-3">
            <Row>
                <Col>
                    <h1 className="mb-5">All Problem</h1>
                </Col>
                <Col>
                    <Input
                        value={search}
                        onChange={(e) => setsearch(e.target.value)}
                        placeholder="Search"
                        className="mt-2"
                        type="text"
                    />
                </Col>
                <Col>
                    <LinkButton
                        className="float-right"
                        color="info"
                        label={
                            <>
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="pr-2"
                                    size="lg"
                                />
                                Create New Problem
                            </>
                        }
                        to="/problems/create"
                    />
                </Col>
            </Row>

            <div className="problem-card-list">
                <DataTable
                    className="text-md border-2"
                    columns={columns}
                    data={displayProblems}
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
                                fontFamily: "monospace"
                            },
                        },
                    }}
                    striped
                />
            </div>
        </div>
    );
};

export default AllProblem;
