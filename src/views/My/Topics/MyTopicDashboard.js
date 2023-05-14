import React, { useEffect, useState } from "react";
import Container from "../../../components/Container";
import { getTopic } from "../../../services/topic.service";
import { useParams } from "react-router-dom";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import CollectionProblems from "../../../components/CollectionProblems";
import CreatorCollectionProblem from "../../../components/CreatorCollectionProblem";

const MyTopicDashboard = () => {
	const { topic_id } = useParams();

	const [topic, settopic] = useState({});
	const [collections, setcollections] = useState([]);

	useEffect(() => {
		getTopic(topic_id).then((response) => {
			// console.log(response.data);
			settopic(response.data.topic);
			setcollections(response.data.collections);
		});
	}, []);

	return (
		<Container>
			<h1>{topic.name}</h1>

			<ReactMarkdown rehypePlugins={[rehypeRaw]}>
				{topic.description}
			</ReactMarkdown>
			{/* <p>{topic.description}</p> */}
			<div className="my-5">
				{collections.map((collection) => (
					<CreatorCollectionProblem
						collectionName={collection.name}
						description={collection.description}
						problems={collection.problems}
						accordianClassName="mb-3"
					/>
				))}
			</div>
		</Container>
	);
};

export default MyTopicDashboard;
