import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import CreateNewProblemButton from "../components/Button/CreateNewProblemButton";
import { Language } from "../constants/language.constant";
import { formatDate } from "../modules/date.module";
import { emitError, emitSuccess } from "../modules/toast.module";
import { openComfirmation } from "../redux/confirmation.reducer";
import {
    deleteMultipleProblem,
    deleteProblem,
    getAllProblems,
} from "../services/problem.service";
import { viewAllSubmissions } from "../services/submission.service";

const mySubmissionColumns = [
    {
        name: "ID",
        maxWidth: "15px",
        selector: (row) => Number(row.submission_id),
        sortable: true,
    },
    {
        name: "Title",
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
        name: "Score",
        maxWidth: "15px",
        selector: (row) => row.score,
    },
    {
        name: "Result",
        selector: (row) => row.result,
    },
    {
        name: "Sent Date",
        selector: (row) => formatDate(row.date),
    },
    {
        name: "",
        selector: (row) => row.view_button,
    },
];

const myProblemColumns = [
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
        name: "",
        right: true,
        selector: (row) => row.edit_button,
    },
    {
        name: "",
        center: true,
        selector: (row) => row.view_button,
    },
    {
        name: "",
        selector: (row) => row.delete_button,
    },
];

const MyProfile = () => {
    const account_id = Number(localStorage.getItem("account_id"));
    const nevigate = useNavigate();
    const dispatch = useDispatch();

    const [myProblems, setmyProblems] = useState([]);
    const [filteredProblems, setfilteredProblems] = useState([]);

    const [mySubmissions, setmySubmissions] = useState([]);
    const [filteredSubmissions, setfilteredSubmissions] = useState([]);

    const [selectedRow, setselectedRow] = useState([]);

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
        viewAllSubmissions({ account_id: account_id, sort_score: 1 }).then(
            (response) => {
                setmySubmissions(response.data.result);
            }
        );
    }, [account_id]);

    useEffect(() => {
        setfilteredProblems(
            myProblems.map((problem) => ({
                ...problem,
                edit_button: (
                    <Button
                        onClick={() => nevigate(`/edit/${problem.problem_id}`)}
                        className="text-white"
                        color="info"
                    >
                        <FontAwesomeIcon icon={faPencil} className="mr-2" />
                        Edit Problem
                    </Button>
                ),
                view_button: (
                    <Button
                        onClick={() =>
                            nevigate(`/problems/${problem.problem_id}`)
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
    }, [myProblems, nevigate]);

    useEffect(() => {
        setfilteredSubmissions(
            mySubmissions.map((submission) => ({
                ...submission,
                status_icon: submission.is_passed ? (
                    <img src={require(`../imgs/passed_icon.png`)} />
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
    }, [mySubmissions]);

    return (
        <div>
            <h1 className="mb-10">My Profile</h1>

            <div className="mb-5">
                <Row className="mb-1">
                    <Col>
                        <h2>My Submission</h2>
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

            <div>
                <Row className="mb-1">
                    <Col xs={8}>
                        <h2>My Problems</h2>
                    </Col>
                    <Col xs={2}>
                        <CreateNewProblemButton className="float-right"/>
                    </Col>
                    <Col>
                        <Button
                            disabled={selectedRow.length == 0}
                            onClick={() =>
                                dispatch(
                                    openComfirmation({
                                        message:
                                            "Are you sure do you want to delete those problems?",
                                        onConfirm: handleDeleteProblem,
                                    })
                                )
                            }
                            className="text-white my-1"
                            color="danger"
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                            {selectedRow.length == 0
                                ? "Delete Problem"
                                : `Delete Problem (${selectedRow.length})`}
                        </Button>
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
