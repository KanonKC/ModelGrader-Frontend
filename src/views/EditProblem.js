import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from "reactstrap";
import { createProblem, editProblem, getProblem } from "../services/problem.service";
import { emitError, emitSuccess } from "../modules/toast.module";
import { useNavigate, useParams } from "react-router-dom";

const EditProblem = () => {

    const nevigate = useNavigate()

    const { problem_id } = useParams()
    const [problem,setproblem] = useState({})

    // Form
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [solution, setSolution] = useState("");
    const [timelimit, setTimelimit] = useState(1.5);
    const [testcases, setTestcases] = useState("");

    const [invalidTestcases, setinvalidTestcases] = useState(false);
    const [loading, setloading] = useState(false);

    const [openModal, setopenModal] = useState(false);
    const [testAmount,settestAmount] = useState(1)
    const [testLine,settestLine] = useState(1)

    const [invisible,setinvisible] = useState(true)

    useEffect(()=> {
        setTimeout(()=>{
            setinvisible(false)
        },250)
    },[])

    useEffect(() => {
        getProblem(problem_id).then(response => {
            setproblem(response.data)
        })
    },[])

    useEffect(() => {
        try{
            setTitle(problem.title)
            setDescription(problem.description)
            setSolution(problem.solution)
            setTimelimit(problem.time_limit)
            setTestcases(problem.testcases.map(test => test.input).join("\n:::\n") + "\n:::")
        }catch(err){}
    },[problem])

    const clearForm = () => {
        setTitle("");
        setDescription("");
        setSolution("");
        setTimelimit(1.5);
        setTestcases("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            let formatted_tc = testcases.split("\n:::\n");
            formatted_tc[formatted_tc.length - 1] = formatted_tc[
                formatted_tc.length - 1
            ].slice(0, -4);
            const body = {
                title: title,
                language: "py",
                description: description,
                solution: solution,
                time_limit: timelimit,
                testcases: formatted_tc,
            };
            setloading(true);
            editProblem(problem_id,body)
                .then((response) => {
                    setloading(false);
                    if (response.status < 400) {
                        emitSuccess("Problem Edited!");
                        setinvalidTestcases(false);
                    }
                })
                .catch(() => {
                    emitError();
                    setloading(false);
                });
        } catch (err) {
            setinvalidTestcases(true);
        }
    };

    return (
        <div className={invisible ? "d-none" : ""}>
            <h1>Edit Problem</h1>
            <Form onSubmit={(e) => handleSubmit(e)} className="mt-5">
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="title">
                                Title <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                id="title"
                                name="title"
                                type="text"
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">
                                Description (Support Markdown){" "}
                                <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                id="description"
                                name="description"
                                type="textarea"
                                required={true}
                                rows={5}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="solution">
                                Solution Code{" "}
                                <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                                className="font-mono"
                                onChange={(e) => setSolution(e.target.value)}
                                value={solution}
                                id="solution"
                                name="solution"
                                type="textarea"
                                required={true}
                                rows={5}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="time_limit">
                                Time Limit (Seconds)
                                <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                                onChange={(e) => setTimelimit(e.target.value)}
                                value={timelimit}
                                id="time_limit"
                                name="time_limit"
                                type="number"
                                required={true}
                                step="0.001"
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="testcases">
                                Testcases (Seperate each case by using :::){" "}
                                <span style={{ color: "red" }}>*</span>
                            </Label>
                            <Input
                                className="font-mono"
                                onChange={(e) => setTestcases(e.target.value)}
                                value={testcases}
                                id="testcases"
                                name="testcases"
                                type="textarea"
                                required={true}
                                rows={19}
                                invalid={invalidTestcases}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Button
                    className="w-1/4 mr-5"
                    type="submit"
                    size="lg"
                    color="primary"
                    disabled={loading}
                >
                    Save
                </Button>
                <Button
                    className="w-1/4"
                    size="lg"
                    color="secondary"
                    onClick={() => nevigate('/my')}
                >
                    Back
                </Button>
            </Form>

            <Modal isOpen={openModal} toggle={() => setopenModal(false)}>
                <ModalHeader>Auto-Generate Testcase</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="amount">
                                Testcase(s) Amount
                            </Label>
                            <Input
                            value={testAmount}
                            onChange={e => settestAmount(e.target.value)}
                                id="amount"
                                name="amount"
                                type="number"
                                required={true}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="linea">
                                Line(s) Amount (for each testcase)
                            </Label>
                            <Input
                                value={testLine}
                                onChange={e => settestLine(e.target.value)}
                                id="linea"
                                name="linea"
                                type="number"
                                required={true}
                            />
                        </FormGroup>
                        {Array.from(Array(testLine).keys()).map(count => <FormGroup>
                            <Label for={`line${count}`}>
                                Line #{count+1}
                            </Label>
                            <Input
                                
                                id={`line${count}`}
                                name={`line${count}`}
                                type="number"
                                required={true}
                            />
                        </FormGroup>)}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={()=>setopenModal(false)}>Generate</Button>
                    <Button color="secondary" onClick={()=>setopenModal(false)}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default EditProblem;
