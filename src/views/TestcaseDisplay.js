import React, { useEffect, useState } from "react";
import { getProblem } from "../services/problem.service";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
} from "reactstrap";

const TestcaseDisplay = () => {
	const { problem_id, testcases_no } = useParams();

	const [input, setinput] = useState("");
	const [output, setoutput] = useState("");

	const [openInput, setOpenInput] = useState("1");
	const [openOutput, setOpenOutput] = useState("2");

	const toggleInput = (id) => {
		if (openInput === id) {
			setOpenInput();
		} else {
			setOpenInput(id);
		}
	};

	const toggleOutput = (id) => {
		if (openOutput === id) {
			setOpenOutput();
		} else {
			setOpenOutput(id);
		}
	};

	useEffect(() => {
		getProblem(problem_id).then((response) => {
			setinput(response.data.testcases[parseInt(testcases_no) - 1].input);
			setoutput(
				response.data.testcases[parseInt(testcases_no) - 1].output
			);
			console.log(
				response.data.testcases[parseInt(testcases_no) - 1].output
			);
		});
	}, [problem_id, testcases_no]);

	return (
		<Container>
			<Accordion open={openInput} toggle={toggleInput}>
				<AccordionItem>
					<AccordionHeader targetId="1">
						<h4>Input</h4>
					</AccordionHeader>
					<AccordionBody accordionId="1">
						<p className="font-mono whitespace-pre-line">{input}</p>
					</AccordionBody>
				</AccordionItem>
			</Accordion>

			<Accordion className="mt-3" open={openOutput} toggle={toggleOutput}>
				<AccordionItem>
					<AccordionHeader targetId="2">
						<h4>Output</h4>
					</AccordionHeader>
					<AccordionBody accordionId="2">
						<p className="font-mono whitespace-pre-line">
							{output}
						</p>
					</AccordionBody>
				</AccordionItem>
			</Accordion>
		</Container>
	);
};

export default TestcaseDisplay;
