import React from "react";
import { Button, Form, Input,FormData, FormGroup } from "reactstrap";
import TopicCard from "../components/Card/TopicCard";
import { createProblem } from "../services/problem.service";

const TopicProblem = () => {
    return (
        <div className="pt-10 md:pt-24">
            <h1>Topics</h1>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                <TopicCard />
                <TopicCard />
                <TopicCard />
                <TopicCard />
                <TopicCard />
            </div>
            <Form onSubmit={e => handleSubmit(e)}>
                <FormGroup>
                    <Input id="file" type="file"/>
                    <Button type="submit">OK</Button>
                </FormGroup>
            </Form>
        </div>
    );
};

export default TopicProblem;
