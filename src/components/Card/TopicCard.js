import React from "react";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { URL } from "../../services/constant.service";

const TopicCard = ({ title, description, image, topicId, onClick }) => {
	return (
		<Card
			onClick={onClick}
			className="topic-card"
			style={{
				width: "18rem",
			}}
		>
			<img
				className="aspect-topic topic-img-border"
				alt="Sample"
				src={
					image === "" || !image
						? require("../../imgs/default_topic.png")
						: `${URL}${image}`
				}
			/>
			<CardBody>
				<CardTitle tag="h5">{title}</CardTitle>
				<CardSubtitle className="mb-2 text-muted" tag="h6">
					{/* {description} */}
				</CardSubtitle>
			</CardBody>
		</Card>
	);
};

export default TopicCard;
