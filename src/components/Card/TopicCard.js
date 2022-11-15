import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle, CardText } from "reactstrap";

const TopicCard = () => {
    return (
        <Card
            className="topic-card"
            style={{
                width: "18rem",
            }}
        >
            <img alt="Sample" src="https://picsum.photos/300/200" />
            <CardBody>
                <CardTitle tag="h5">Introduction to Programming</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                    Created by KanonKC
                </CardSubtitle>
                
            </CardBody>
        </Card>
    );
};

export default TopicCard;
