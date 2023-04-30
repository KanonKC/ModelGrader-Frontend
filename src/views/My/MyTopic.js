import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Input, Row } from "reactstrap";
import TopicsGrid from "../../components/TopicsGrid";
import { getAllTopics } from "../../services/topic.service";
import TopicCard from "../../components/Card/TopicCard";

const MyTopic = () => {
	const account_id = Number(localStorage.getItem("account_id"));
	const nevigate = useNavigate();

	const [topics, settopics] = useState([]);
	const [displayTopics, setdisplayTopics] = useState([]);
	const [search, setsearch] = useState(null);

	useEffect(() => {
		getAllTopics(account_id).then((response) => {
			settopics(response.data.topics);
		});
	}, [account_id]);

	useEffect(() => {
		if (!search || search === "") {
			setdisplayTopics(topics);
		} else {
			setdisplayTopics(
				topics.filter((topic) => topic.name.includes(search))
			);
		}
	}, [topics, search]);

	return (
		<div className="pt-24">
			<h1>My Topic</h1>

			<div className="mt-4">
				<Row>
					<Col xs={4}>
						<Input
							placeholder="Search Topic ..."
							value={search}
							onChange={(e) => setsearch(e.target.value)}
						/>
					</Col>
					<Col></Col>
					<Col xs={2} className="">
						<Button
							onClick={() => nevigate("./create")}
							className="text-white"
							color="info"
						>
							<FontAwesomeIcon icon={faPlus} className="mr-2" />
							Create New Topic
						</Button>
					</Col>
				</Row>
			</div>

			<TopicsGrid>
				{displayTopics.reverse().map((topic) => (
					<TopicCard
						title={topic.name}
						description={topic.description}
						image={topic.image_url}
						onClick={() => nevigate(`./${topic.topic_id}`)}
					/>
				))}
			</TopicsGrid>
		</div>
	);
};

export default MyTopic;
