import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";
import CreateNewProblemButton from "../components/Button/CreateNewProblemButton";
import TrackerCard from "../components/Card/TrackerCard";
import SearchBar from "../components/SearchBar";
import { Language } from "../constants/language.constant";
import { formatDate } from "../modules/date.module";
import { hasSubstring } from "../modules/search.module";
import { emitError, emitSuccess } from "../modules/toast.module";
import { openComfirmation } from "../redux/confirmation.reducer";
import { getAccount } from "../services/account.service";
import {
    deleteMultipleProblem,
    getAllProblems,
} from "../services/problem.service";
import { viewAllSubmissions } from "../services/submission.service";

const Profile = () => {
    const { account_id } = useParams();

    const [account, setaccount] = useState({});
    const [submissions, setsubmissions] = useState([]);
    const [problems,setproblems] = useState([])

    const [submissionCount,setsubmissionCount] = useState(0)
    const [passedCount,setpassedCount] = useState(0)
    const [problemCount,setproblemCount] = useState(0)

    useEffect(() => {
        getAccount(account_id).then((response) => {
            setaccount(response.data)
        });
        viewAllSubmissions({ account_id: account_id }).then((response) => {
            setsubmissions(response.data.result);
        });
        getAllProblems().then((response) => {
            setproblems(
                response.data.result.filter(
                    (problem) => problem.account_id === account_id
                )
            );
        });
    }, [account_id]);

    useEffect(() => {
        setsubmissionCount(submissions.length)
        const passedSubmissions = submissions.filter((submission) => submission.is_passed)
        let result = []
        for(let i in passedSubmissions){
            if(!result.includes(passedSubmissions[i].problem_id)){
                result.push(passedSubmissions[i].problem_id)
            }
        }
        setpassedCount(result.length)
    },[submissions])

    useEffect(() => {
        setproblemCount(problems.length)
    },[problems])

    return (
        <div>
            <h1 className="mb-10">You are visiting <span style={{color: "orange"}}>{account.username}</span></h1>
            <Row className="mx-20">
                <Col>
                    <TrackerCard
                        color="danger"
                        text="SUBMISSIONS"
                        count={submissionCount}
                        to="./submissions"
                    />
                </Col>
                <Col>
                    <TrackerCard
                        color="success"
                        text="PASSED"
                        count={passedCount}
                        to="./submissions"
                    />
                </Col>
                <Col>
                    <TrackerCard
                        color="info"
                        text="PROBLEMS"
                        count={problemCount}
                        to="./problems"
                    />
                </Col>
            </Row>
        </div>
    );
};
export default Profile;
