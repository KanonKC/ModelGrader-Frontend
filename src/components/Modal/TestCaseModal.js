import React, { useEffect } from "react";
import { Modal, ModalBody, Table } from "reactstrap";

const newlineToBreak = (text) => {
	let sptNewline = text.split("\n");
	return (
		<div>
			{sptNewline.map((block) => (
				<>
					{block}
					<br />
				</>
			))}
		</div>
	);
};

const TestcaseRow = ({ no, input, output }) => {
	return (
		<tr>
			<th scope="row">{no}</th>
			<td>{newlineToBreak(input)}</td>
			<td>{newlineToBreak(output)}</td>
		</tr>
	);
};

const TestCaseModal = ({ isOpen, toggle, testcases }) => {
	useEffect(() => {
		console.log(testcases);
	}, [testcases]);

	return (
		<Modal isOpen={isOpen} toggle={toggle}>
			<ModalBody>
				<Table bordered>
					<thead>
						<tr>
							<th>#</th>
							<th>Input</th>
							<th>Output</th>
						</tr>
					</thead>
					<tbody>
						{testcases?.map((testcase, index) => (
							<TestcaseRow
								no={index + 1}
								input={testcase.input}
								output={testcase.output}
							/>
						))}
					</tbody>
				</Table>
			</ModalBody>
		</Modal>
	);
};

export default TestCaseModal;
