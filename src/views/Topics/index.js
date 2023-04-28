import React, { useEffect, useState } from "react";
import TopicCard from "../../components/Card/TopicCard";
import { getAllTopics } from "../../services/topic.service";
import TopicsGrid from "../../components/TopicsGrid";
import { useNavigate } from "react-router-dom";

const Topics = () => {
	const [topics, settopics] = useState([]);
	const nevigate = useNavigate();

	useEffect(() => {
		getAllTopics().then((response) => {
			settopics(response.data.topics);
		});
	}, []);

	return (
		<div className="pt-10 md:pt-24">
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
		</div>
	);
};

export default Topics;
