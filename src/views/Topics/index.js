import React, { useEffect, useState } from "react";
import { Button, Form, Input, FormData, FormGroup } from "reactstrap";
import TopicCard from "../../components/Card/TopicCard";
import { createProblem } from "../../services/problem.service";
import { getAllTopics } from "../../services/topic.service";
import TopicsGrid from "../../components/TopicsGrid";
import { useNavigate } from "react-router-dom";

const Topics = () => {

    const [topics, settopics] = useState([])
    const nevigate = useNavigate()

    useEffect(() => {
        getAllTopics().then(response => {
            settopics(response.data.topics)
        })
    }, [])

    return (
        <div className="pt-10 md:pt-24">
            <h1>Topics</h1>
            <TopicsGrid>
                {topics.reverse().map(topic => (<TopicCard title={topic.name} description={topic.description} image={topic.image_url} onClick={() => nevigate(`/topics/${topic.topic_id}`)}/>))}
            </TopicsGrid>
            {/* <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"> */}
            {/* {topics.reverse().map(topic => (<TopicCard title={topic.name} description={topic.description} image={topic.image_url} topicId={topic.topic_id}/>))} */}
            {/* </div> */}
        </div>
    );
};

export default Topics;
