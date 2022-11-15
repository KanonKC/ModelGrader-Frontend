import React from "react";
import TopicCard from "../components/Card/TopicCard";

const TopicProblem = () => {
    return (
        <div>
            <h1>Topics</h1>
            <div className="mt-5 grid grid-cols-5 gap-4">
                <TopicCard />
                <TopicCard />
                <TopicCard />
                <TopicCard />
                <TopicCard />
                <TopicCard />
            </div>
        </div>
    );
};

export default TopicProblem;
