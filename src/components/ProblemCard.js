import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "reactstrap";
import LinkButton from "./LinkButton";

const ProblemCard = ({ problem, submission=[]}) => {

    return (
        <div className="problem-card">
            <Row>
                <Col>
                    <div className="my-3">
                        <h2 className="mb-0">{problem.title}</h2>
                        <i className="text-base">
                            Created by: {problem.creator.username}
                        </i>
                        {submission.length == 0 ? (
                            <p className="text-base text-transparent">
                                <b>:</b>
                            </p>
                        ) : (
                            <p className="text-base">
                                <b>Best Score:</b> <span className="font-mono">{submission[0].result}</span>
                            </p>
                        )}
                    </div>
                </Col>
                <Col className="flex items-center justify-end">
                    <div className="mr-10">
                        {submission[0] && submission[0].is_passed ? <LinkButton
                            className="text-lg py-2 px-2"
                            color='success'
                            to={`/problems/${problem.problem_id}`}
                            label='Solve Again'
                        /> : <LinkButton
                        className="text-lg p-2"
                        color='danger'
                        to={`/problems/${problem.problem_id}`}
                        label='Solve Problem'
                    />}
                        
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProblemCard;
