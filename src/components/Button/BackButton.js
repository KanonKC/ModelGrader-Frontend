import { faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const BackButton = ({to}) => {
    const nevigate = useNavigate()
    return (
        <Button
            color="info"
            className="mb-2 text-white"
            size="lg"
            onClick={() => nevigate(to)}
        >
            <FontAwesomeIcon icon={faReply} className="pr-2" />
            Back
        </Button>
    );
};

export default BackButton;
