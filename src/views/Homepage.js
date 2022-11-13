import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import LinkButton from "../components/LinkButton";

const Homepage = () => {
    const nevigate = useNavigate();
    return (
        <div className="homepage text-center">
            <h1 className="text-7xl">Welcome to Model Grader</h1>
            <p className="text-3xl my-10">
                This is very prototype grader software.
            </p>
            <Button
                className="homepage-btn px-4"
                color="primary"
                size="lg"
                onClick={() => window.location.pathname = '/problems'}
            >
                Solving Problem
            </Button>
        </div>
    );
};

export default Homepage;
