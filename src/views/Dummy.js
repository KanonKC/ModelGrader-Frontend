import axios from "axios";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Button, Form, Input } from "reactstrap";
import rehypeRaw from "rehype-raw";
import TestCard from "../components/Card/TestCard";
import { createTopic } from "../services/topic.service";

const Dummy = () => {
    
    const hundredTime = (n) => {
        console.log(n*100)
    }

    return (
        <div className="pt-24">
            <TestCard whenClick={(n) => console.log(n*100)}/>
            {/* <TestCard/> */}
            {/* <TestCard/> */}
            {/* <TestCard/> */}
        </div>
    );
};

export default Dummy;
