import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Input, Row } from "reactstrap";
import LinkButton from "../components/LinkButton";
import ProblemCard from "../components/ProblemCard";
import { getAllProblems } from "../services/problem.service";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { hasSubstring } from "../modules/search.module";
import { viewAllSubmissions } from "../services/submission.service";
import { getAuthorization } from "../services/auth.service";

const AllProblem = () => {
    const [allProblems, setAllProblems] = useState({});
    const [allSubmissions, setallSubmissions] = useState({});
    const [cardlist, setCardlist] = useState([]);
    const [isloggin, setisloggin] = useState(false);

    const [search, setsearch] = useState("");

    useEffect(() => {
        getAllProblems().then((response) => {
            setAllProblems(response.data);
        });
    }, []);

    useEffect(() => {
        getAuthorization().then((response) => {
            setisloggin(response.data.result);
        });
    }, [allProblems]);

    useEffect(() => {
        viewAllSubmissions({
            account_id: localStorage.getItem("account_id"),
            sort_score: 1,
        }).then((response) => {
            console.log(response.data);
            setallSubmissions(response.data);
        });
    }, [isloggin]);

    useEffect(() => {
        try {
            if (isloggin) {
                setCardlist(
                    allProblems.result
                        .filter((value) =>
                            search ? hasSubstring(value.title, search) : true
                        )
                        .map((value) => (
                            <ProblemCard
                                submission={
                                    allSubmissions.result.filter(
                                        (sub) =>
                                            sub.problem_id == value.problem_id
                                    ) 
                                }
                                problem={value}
                            />
                        ))
                );
            } else {
                setCardlist(
                    allProblems.result
                        .filter((value) =>
                            search ? hasSubstring(value.title, search) : true
                        )
                        .map((value) => (
                            <ProblemCard
                                problem={value}
                            />
                        ))
                );
            }
        } catch (err) {}
    }, [allSubmissions, search]);

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
                        color="primary"
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
                {cardlist.length == 0 ? (
                    <h4 className="mx-a">No Problem Found</h4>
                ) : (
                    <Row>
                        <Col>
                            {cardlist.filter((value, index) => index % 2 == 0)}
                        </Col>
                        <Col>
                            {cardlist.filter((value, index) => index % 2 != 0)}
                        </Col>
                    </Row>
                )}
            </div>
        </div>
    );
};

export default AllProblem;
