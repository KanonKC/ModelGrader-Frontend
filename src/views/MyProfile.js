import { faEye, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import { Language } from "../constants/language.constant";
import { getAllProblems } from "../services/problem.service";

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
        name: "",
        right: true,
        selector: (row) => row.edit_button,
    },
    {
        name: "",
        selector: (row) => row.view_button,
    },
];

const MyProfile = () => {
    const account_id = localStorage.getItem("account_id");
    const nevigate = useNavigate();

    const [myProblems, setmyProblems] = useState([]);
    const [filteredProblems, setfilteredProblems] = useState([]);

    useEffect(() => {
        getAllProblems().then((response) => {
            setmyProblems(
                response.data.result.filter(
                    (problem) => problem.account_id === Number(account_id)
                )
            );
        });
    }, [account_id]);

    useEffect(() => {
        console.log(myProblems)
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
                        Edit This Problem
                    </Button>
                ),
                view_button: (
                    <Button
                        onClick={() => nevigate(`/problems/${problem.problem_id}`)}
                        className="text-white"
                        color="success"
                    >
                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                        View This Problem
                    </Button>
                )
            }))
        );
    }, [myProblems,nevigate]);

    return (
        <div>
            <h1 className="mb-10">My Profile</h1>
            <h2>Edit My Problems</h2>
            <DataTable
                className="text-md border-2"
                columns={columns}
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
    );
};
export default MyProfile;
