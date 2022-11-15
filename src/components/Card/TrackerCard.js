import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "reactstrap";

const TrackerCard = ({text,count,to,...args}) => {

    const nevigate = useNavigate()

    return (
        <Card {...args} onClick={() => nevigate(to)} className="stat-card text-center">
            <div className="my-10 text-white">
                
            <h1>{text}</h1>
            <h1 className="text-9xl">{count}</h1>
            </div>
        </Card>
    );
};

export default TrackerCard;
