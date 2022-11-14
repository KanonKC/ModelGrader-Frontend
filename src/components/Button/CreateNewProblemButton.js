import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const CreateNewProblemButton = ({...args}) => {
    const nevigate = useNavigate()

    return (
        <div>
            <Button
                {...args}
                onClick={() => nevigate("/problems/create")}
                className="text-white"
                color="info"
            >
                <FontAwesomeIcon icon={faPlus} className="pr-2" size="lg" />
                Create New Problem
            </Button>
        </div>
    );
};

export default CreateNewProblemButton;
