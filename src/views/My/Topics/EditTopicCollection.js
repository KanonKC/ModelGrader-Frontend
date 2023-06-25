import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Button, ListGroup } from "reactstrap";
import OrderInputListItem from "../../../components/OrderInputListItem";
import { getAllCollections } from "../../../services/collection.service";
import { useParams } from "react-router-dom";
import {
	addTopicCollection,
	getTopic,
	removeTopicCollection,
} from "../../../services/topic.service";
import { emitError, emitSuccess } from "../../../modules/swal.module";

const EditTopicCollection = () => {
	const account_id = Number(localStorage.getItem("account_id"));
	const { topic_id } = useParams();

	const [loading, setLoading] = useState(false);

	const [collections, setcollections] = useState([]);
	const [collectionList, setcollectionList] = useState([]);
	const [collectionOptions, setcollectionOptions] = useState([]);

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

	const handleRemoveCollection = (index) => {
		setcollectionList([
			...collectionList.slice(0, index),
			...collectionList.slice(index + 1),
		]);
	};

	const handleSave = () => {
		const addCollectionIds = collectionList
			.sort((a, b) => a.order - b.order)
			.map((collection) => collection.id);

		const removeCollectionIds = collections
			.filter(
				(collection) =>
					!addCollectionIds.includes(collection.collection_id)
			)
			.map((collection) => collection.collection_id);

		setLoading(true);
		addTopicCollection(topic_id, addCollectionIds)
			.then(() => {
				return removeTopicCollection(topic_id, removeCollectionIds);
			})
			.then(() => {
				emitSuccess("Successfully edited Topic");
				setLoading(false);
			})
			.catch(() => {
				emitError();
				setLoading(false);
			});
	};

	useEffect(() => {
		getTopic(topic_id).then((response) => {
			const { data } = response;

			setcollectionList(
				data.collections.map((collection) => ({
					title: collection.name,
					order: collection.order,
					id: collection.collection_id,
				}))
			);
		});
	}, [topic_id]);

	useEffect(() => {
		getAllCollections(account_id).then((response) => {
			setcollections(response.data.collections);
		});
	}, [account_id]);

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

	return (
		<div>
			<h1>Collections</h1>
			<div className="my-3">
				<Select
					onChange={(e) => handleAddCollection(e)}
					options={collectionOptions}
				/>
			</div>

			<ListGroup>
				{collectionList?.map((collection, index) => (
					<OrderInputListItem
						title={collection.title}
						value={collection.order}
						onChange={(e) => handleEditCollectionOrder(e, index)}
						onRemove={() => handleRemoveCollection(index)}
					/>
				))}
			</ListGroup>

			<Button
				onClick={() => handleSave()}
				className="w-1/4 mt-3"
				type="submit"
				size="lg"
				color="primary"
				disabled={loading}
			>
				Save
			</Button>
		</div>
	);
};

export default EditTopicCollection;
