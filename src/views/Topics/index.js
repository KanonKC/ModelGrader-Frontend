import React, { useEffect, useState } from "react";
import TopicCard from "../../components/Card/TopicCard";
import { getAllTopics } from "../../services/topic.service";
import TopicsGrid from "../../components/TopicsGrid";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Layout/Container";

const Topics = () => {
	const [topics, settopics] = useState([]);
	const nevigate = useNavigate();

	useEffect(() => {
		getAllTopics().then((response) => {
			settopics(response.data.topics);
		});
	}, []);

	return (
		<Container>
			<h1>Topics</h1>
			<TopicsGrid>
				{topics.reverse().map((topic) => (
					<TopicCard
						title={topic.name}
						description={topic.description}
						image={topic.image_url}
						onClick={() => nevigate(`/topics/${topic.topic_id}`)}
					/>
				))}
			</TopicsGrid>
		</Container>
	);
};

export default Topics;
