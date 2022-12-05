import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle, CardText } from "reactstrap";

const TopicCard = ({title,description,image}) => {
    return (
        <Card
            className="topic-card"
            style={{
                width: "18rem",
            }}
        >
            <img className="aspect-topic" alt="Sample" src={image === "" ? require('../../imgs/default_topic.png') : image} />
            <CardBody>
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {description}
                </CardSubtitle>
                
            </CardBody>
        </Card>
    );
};

export default TopicCard;
