import React, { useEffect, useState } from "react";
import {
	Accordion,
	AccordionBody,
	AccordionHeader,
	AccordionItem,
} from "reactstrap";
import ProblemsTable from "./ProblemsTable";

const CollectionProblems = ({
	collectionName,
	description,
	problems,
	submissions = [],
	accordianClassName,
}) => {
	const [open, setOpen] = useState(null);
	const [completed, setcompleted] = useState(false);

	const toggle = (id) => {
		if (open === id) {
			setOpen();
		} else {
			setOpen(id);
		}
	};

	useEffect(() => {
		if (submissions.length > 0) {
			let problem_ids = problems.map((problem) => problem.problem_id);
			let duplicatedProblemIds = [];
			let passedSubmissionCount = 0;

			for (const submission of submissions) {
				if (
					submission.is_passed &&
					problem_ids.includes(submission.problem_id) &&
					!duplicatedProblemIds.includes(submission.problem_id)
				) {
					passedSubmissionCount++;
					duplicatedProblemIds.push(submission.problem_id);
				}
			}

			setcompleted(passedSubmissionCount === problems.length);
		}
	}, [problems, submissions]);

	useEffect(() => {
		setOpen(completed ? null : "1");
	}, [completed]);

	return (
		<div>
			<Accordion
				className={accordianClassName}
				open={open}
				toggle={toggle}
			>
				<AccordionItem>
					<AccordionHeader targetId="1">
						{completed && (
							<img
								className="inline pb-[1px] mr-1"
								src={require("../imgs/passed_icon.png")}
								alt="Complete Icon"
							/>
						)}
						{collectionName}
						{completed && <i className="ml-1">(Completed)</i>}
					</AccordionHeader>
					<AccordionBody accordionId="1">
						<p className="text-base">{description}</p>
						<ProblemsTable
							problems={problems}
							submissions={submissions}
							noPagination
						/>
					</AccordionBody>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default CollectionProblems;
