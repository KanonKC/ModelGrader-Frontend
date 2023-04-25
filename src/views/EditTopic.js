import { faL } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	ListGroup,
	Row,
} from "reactstrap";
import Swal from "sweetalert2";
import RequiredSymbol from "../components/RequiredSymbol";
import { getAllProblems } from "../services/problem.service";
import {
	addTopicCollection,
	addTopicProblem,
	createTopic,
	getTopic,
	updateTopic,
} from "../services/topic.service";
import { getAllCollections } from "../services/collection.service";
import { useNavigate, useParams } from "react-router-dom";
import OrderInputListItem from "../components/OrderInputListItem";
import { emitError, emitSuccess } from "../modules/toast.module";

const EditTopic = () => {
	const account_id = Number(localStorage.getItem("account_id"));
	const nevigate = useNavigate();
	const { topic_id } = useParams();

	const [topic, settopic] = useState({});
	const [collectionList, setcollectionList] = useState([]);
	const [collections, setcollections] = useState([]);

	const [loading, setloading] = useState(false);

	const [name, setname] = useState("");
	const [description, setdescription] = useState("");
	const [isPrivate, setisPrivate] = useState(false);
	const [isActive, setisActive] = useState(true);

	const [banner, setbanner] = useState(null);
	const [collectionOptions, setcollectionOptions] = useState([]);
	const [selectedCollections, setselectedCollections] = useState([]);

	useEffect(() => {
		getAllCollections(account_id).then((response) => {
			setcollections(response.data.collections);
		});
	}, [account_id]);

	useEffect(() => {
		getTopic(topic_id).then((response) => {
			const { data } = response;

			settopic(data.topic);
			setcollectionList(
				data.collections.map((collection) => ({
					title: collection.name,
					order: collection.order,
					id: collection.collection_id,
				}))
			);

			setname(data.topic.name);
			setdescription(data.topic.description);
			setisPrivate(data.topic.is_private);
			setisActive(data.topic.is_active);
		});
	}, [topic_id]);

	useEffect(() => {
		setcollectionOptions(
			collections.map((collection) => ({
				label: collection.name,
				value: collection.collection_id,
			}))
		);
	}, [collections]);

	useEffect(() => {
		let collectionListIds = collectionList.map(
			(collection) => collection.collection_id
		);

		setcollectionOptions(
			collections
				.filter(
					(collection) =>
						!collectionListIds.includes(collection.collection_id)
				)
				.map((collection) => ({
					label: collection.name,
					value: collection.collection_id,
				}))
		);
	}, [collections, collectionList]);

	useEffect(() => {
		console.log(collectionOptions);
	}, [collectionOptions]);

	const setPreviewBanner = (e) => {
		if (e.target.files && e.target.files[0]) {
			setbanner(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleReset = () => {
		setbanner(null);
		setselectedCollections(null);
		document.getElementById("create-topic-form").reset();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();

		formData.append("name", e.target.name.value);
		formData.append("description", e.target.description.value);
		formData.append("is_active", e.target.is_active.checked);
		formData.append("is_private", e.target.is_private.checked);

		if (e.target.image_url.files.length !== 0) {
			formData.append("image_url", e.target.image_url.files[0]);
		}

		const addCollectionIds = collectionList
			.sort((a, b) => a.order - b.order)
			.map((collection) => collection.id);

		setloading(true);
		updateTopic(topic_id, formData)
			.then(() => {
				return addTopicCollection(topic_id, addCollectionIds);
			})
			.then(() => {
				emitSuccess("Successfully edited Topic");
				setloading(false);
			})
			.catch(() => {
				emitError();
				setloading(false);
			});
	};

	const handleAddCollection = (e) => {
		setcollectionList([
			...collectionList,
			{
				title: e.label,
				order: collectionList.length,
				id: e.value,
			},
		]);
	};

	const handleEditCollectionOrder = (e, index) => {
		setcollectionList([
			...collectionList.slice(0, index),
			{
				...collectionList[index],
				order: Number(e.target.value),
			},
			...collectionList.slice(index + 1),
		]);
	};

	return (
		<div className="pt-24">
			<h1>Edit Topic</h1>
			<Form
				id="create-topic-form"
				className="mt-5"
				onSubmit={(e) => handleSubmit(e)}
				onReset={handleReset}
			>
				<Row>
					<Col>
						<FormGroup>
							<Label>
								Topic Name <RequiredSymbol />
							</Label>
							<Input
								value={name}
								onChange={(e) => setname(e.target.value)}
								required
								type="text"
								id="name"
							/>
						</FormGroup>
						<FormGroup>
							<Label>Description</Label>
							<Input
								value={description}
								onChange={(e) => setdescription(e.target.value)}
								type="textarea"
								id="description"
								rows={5}
							/>
						</FormGroup>
						<Row>
							<Col>
								<FormGroup>
									<Input
										checked={isPrivate}
										onChange={(e) =>
											setisPrivate(e.target.checked)
										}
										id="is_private"
										type="checkbox"
									/>
									<Label check className="ml-2">
										Private
									</Label>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Input
										checked={isActive}
										onChange={(e) =>
											setisActive(e.target.checked)
										}
										id="is_active"
										type="checkbox"
									/>
									<Label check className="ml-2">
										Active
									</Label>
								</FormGroup>
							</Col>
						</Row>

						{/* <FormGroup>
							<Label>Collections</Label>
							<Select
								options={collectionOptions}
								onChange={(e) => setselectedCollections(e)}
								value={selectedCollections}
								isMulti
							/>
						</FormGroup> */}
					</Col>
					<Col>
						<FormGroup>
							<Label>Topic Banner</Label>
							<Input
								type="file"
								id="image_url"
								accept="image/jpg, image/jpeg, image/png"
								onChange={(e) => setPreviewBanner(e)}
							/>
							<img className="mt-2" src={banner} />
						</FormGroup>

						<div className="mb-3">
							<Label>Collection</Label>
							<Select
								onChange={(e) => handleAddCollection(e)}
								options={collectionOptions}
							/>
						</div>

						<Label>Added Collections</Label>
						<ListGroup>
							{collectionList?.map((collection, index) => (
								<OrderInputListItem
									title={collection.title}
									value={collection.order}
									onChange={(e) =>
										handleEditCollectionOrder(e, index)
									}
								/>
							))}
						</ListGroup>
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
					onClick={() => nevigate("./../")}
					className="w-1/4"
					type="button"
					size="lg"
					color="secondary"
					disabled={loading}
				>
					Back
				</Button>
			</Form>
		</div>
	);
};

export default EditTopic;
