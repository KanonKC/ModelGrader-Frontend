import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	ListGroup,
	ListGroupItem,
	Row,
} from "reactstrap";
import { emitError, emitSuccess } from "../../modules/toast.module";
import {
	addCollectionProblem,
	createCollection,
	getCollection,
	updateCollection,
} from "../../services/collection.service";
import { getAllProblems } from "../../services/problem.service";
import OrderInputListItem from "../OrderInputListItem";

const ProblemList = () => {
	return (
		<ListGroupItem>
			<Row>
				<Col xs={2}>
					<Input />
				</Col>
				<Col>Cras justo odio</Col>
				<Col xs={1}>
					<Button color="danger">
						<FontAwesomeIcon icon={faX} />
					</Button>
				</Col>
			</Row>
		</ListGroupItem>
	);
};

const CollectionForm = ({ editMode = false, collectionId }) => {
	const account_id = Number(localStorage.getItem("account_id"));
	const nevigate = useNavigate();

	const [loading, setloading] = useState(false);

	const [collection, setcollection] = useState([]);
	const [problemList, setproblemList] = useState([]);
	const [problems, setproblems] = useState([]);

	// Form
	const [name, setname] = useState("");
	const [description, setdescription] = useState("");
	const [isPrivate, setisPrivate] = useState(false);
	const [isActive, setisActive] = useState(true);

	const [problemOptions, setproblemOptions] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const body = {
			name: e.target.name.value,
			description: e.target.description.value,
			is_active: e.target.active.checked,
			is_private: e.target.private.checked,
		};

		const addProblemIds = problemList
			.sort((a, b) => a.order - b.order)
			.map((problem) => problem.id);

		setloading(true);

		if (!editMode) {
			createCollection(account_id, body)
				.then((response) => {
					emitSuccess("Collection has created!");
					setloading(false);
				})
				.catch((err) => {
					emitError();
					setloading(false);
				});
		} else {
			// setloading(false);
			updateCollection(collectionId, body)
				.then((response) => {
					return addCollectionProblem(
						collection.collection_id,
						addProblemIds
					);
				})
				.then(() => {
					emitSuccess("Collection has edited!");
					setloading(false);
				})
				.catch((err) => {
					emitError();
					setloading(false);
				});
		}
	};

	const handleAddProblem = (e) => {
		setproblemList([
			...problemList,
			{
				title: e.label,
				order: problemList.length,
				id: e.value,
			},
		]);
	};

	const handleEditProblemOrder = (e, index) => {
		setproblemList([
			...problemList.slice(0, index),
			{
				...problemList[index],
				order: Number(e.target.value),
			},
			...problemList.slice(index + 1),
		]);
	};

	useEffect(() => {
		console.log("PL", problemList);
	}, [problemList]);

	useEffect(() => {
		getCollection(collectionId).then((response) => {
			setcollection(response.data.collection);
			setproblemList(
				response.data.problems.map((problem) => ({
					title: problem.title,
					order: problem.order,
					id: problem.problem_id,
				}))
			);
		});

		getAllProblems().then((response) => {
			setproblems(response.data.result);
		});
	}, []);

	useEffect(() => {
		setname(collection.name);
		setdescription(collection.description);
		setisPrivate(collection.is_private);
		setisActive(collection.is_active);
	}, [collection]);

	useEffect(() => {
		let problemListIds = problemList.map((problem) => problem.problem_id);

		setproblemOptions(
			problems
				.filter(
					(problem) => !problemListIds.includes(problem.problem_id)
				)
				.map((problem) => ({
					label: problem.title,
					value: problem.problem_id,
				}))
		);
	}, [problems, problemList]);

	return (
		<Form onSubmit={(e) => handleSubmit(e)}>
			<Row>
				<Col>
					<FormGroup>
						<Label>Collection Name</Label>
						<Input
							value={name}
							onChange={(e) => setname(e.target.value)}
							id="name"
							type="text"
						/>
					</FormGroup>

					<FormGroup>
						<Label>Description</Label>
						<Input
							value={description}
							onChange={(e) => setdescription(e.target.value)}
							id="description"
							type="textarea"
							rows={4}
						/>
					</FormGroup>

					<Row>
						<Col>
							<FormGroup>
								<Input
									id="private"
									type="checkbox"
									className="mr-2"
									checked={isPrivate}
									onChange={(e) =>
										setisPrivate(e.target.checked)
									}
								/>
								<Label>Private</Label>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Input
									id="active"
									type="checkbox"
									className="mr-2"
									checked={isActive}
									onChange={(e) =>
										setisActive(e.target.checked)
									}
								/>
								<Label>Active</Label>
							</FormGroup>
						</Col>
					</Row>

					<Button
						className="w-1/3 mr-5"
						type="submit"
						size="lg"
						color="primary"
						disabled={loading}
					>
						{editMode ? "Save" : "Create"}
					</Button>
					<Button
						className="w-1/3"
						size="lg"
						color="secondary"
						onClick={() => nevigate("./../")}
					>
						Back
					</Button>
				</Col>
				<Col>
					{editMode && (
						<div>
							<div className="mb-3">
								<Label>Problem</Label>
								<Select
									onChange={(e) => handleAddProblem(e)}
									options={problemOptions}
								/>
							</div>

							<Label>Added Problems</Label>
							<ListGroup>
								{problemList?.map((problem, index) => (
									<OrderInputListItem
										title={problem.title}
										value={problem.order}
										onChange={(e) =>
											handleEditProblemOrder(e, index)
										}
									/>
								))}
							</ListGroup>
						</div>
					)}
				</Col>
			</Row>
		</Form>
	);
};

export default CollectionForm;
