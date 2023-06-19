import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalBody, Table } from "reactstrap";

const TestcaseRow = ({ problemId, no, input, output }) => {
	const nevigate = useNavigate();

	const MAX_LENGTH = 500;
	const MAX_LINE = 20;

	const limitedCharacter = (text) => {
		let result = text;
		let noEdit = true;

		if (result.length > MAX_LENGTH) {
			noEdit = false;
			result = result.slice(0, MAX_LENGTH);
		}

		const sptText = result.split("\n");
		if (sptText.length > MAX_LINE) {
			noEdit = false;
			result = sptText.slice(0, MAX_LINE).join("\n");
		}

		if (!noEdit) {
			result += "\n... More";
		}
		return result;
	};

	const handleClick = (e) => {
		switch (e.button) {
			case 0:
				// nevigate(`/problems/${problemId}/testcases/${no}`);
				break;
			case 1:
				nevigate(`/problems/${problemId}/testcases/${no}`);
				break;

			default:
				break;
		}
	};

	return (
		<tr className="cursor-pointer" onMouseDown={handleClick}>
			<th scope="row">{no}</th>
			<td className="font-mono whitespace-pre-line">
				{limitedCharacter(input)}
			</td>
			<td className="font-mono whitespace-pre-line">
				{limitedCharacter(output)}
			</td>
		</tr>
	);
};

const TestCaseModal = ({ problemId, isOpen, toggle, testcases }) => {
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
								problemId={problemId}
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
