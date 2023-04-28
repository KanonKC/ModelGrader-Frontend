import React from "react";
import { Button } from "reactstrap";
import TestCard from "../components/Card/TestCard";
import SubmissionCalendar from "../components/SubmissionCalendar";
import { emitConfirmation } from "../modules/swal.module";

const Dummy = () => {
	// const hundredTime = (n) => {
	// 	console.log(n * 100);
	// };

	return (
		<div className="pt-24">
			<TestCard whenClick={(n) => console.log(n * 100)} />
			<SubmissionCalendar />
			{/* <TestCard/> */}
			{/* <TestCard/> */}
			{/* <TestCard/> */}
			<Button
				onClick={() => emitConfirmation("", () => console.log("Hello"))}
			>
				AAA
			</Button>
		</div>
	);
};

export default Dummy;
