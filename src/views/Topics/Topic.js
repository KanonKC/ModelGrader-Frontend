import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopic } from "../../services/topic.service";
import CollectionProblems from "../../components/CollectionProblems";
import { viewAllSubmissions } from "../../services/submission.service";
import { AuthContext } from "../../App";
import { useContext } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";

const Topic = () => {
	const account_id = Number(localStorage.getItem("account_id"));
	const [isLoggin, setisLoggin] = useContext(AuthContext);

	const { topic_id } = useParams();
	const [topic, settopic] = useState({});
	const [collections, setcollections] = useState([]);
	const [allSubmissions, setallSubmissions] = useState([]);

	useEffect(() => {
		getTopic(topic_id).then((response) => {
			settopic(response.data.topic);
			setcollections(response.data.collections);
		});
	}, []);

	useEffect(() => {
		viewAllSubmissions({
			account_id: account_id,
			sort_score: 1,
		}).then((response) => {
			setallSubmissions(response.data.result);
		});
	}, [account_id]);

	return (
		<div className="pt-10 md:pt-24">
			<h1>{topic.name}</h1>

			<ReactMarkdown rehypePlugins={[rehypeRaw]}>
				{topic.description}
			</ReactMarkdown>
			{/* <p>{topic.description}</p> */}
			<div className="my-5">
				{collections.map((collection) => (
					<CollectionProblems
						collectionName={collection.name}
						description={collection.description}
						problems={collection.problems}
						submissions={allSubmissions}
						accordianClassName="mb-3"
					/>
				))}
			</div>
		</div>
	);
};

export default Topic;
