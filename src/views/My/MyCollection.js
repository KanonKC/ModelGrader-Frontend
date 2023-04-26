import React, { useEffect, useState } from "react";
import CollectionTable from "../../components/Table/CollectionTable";
import { Button, Col, Input, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import CollectionProblems from "../../components/CollectionProblems";
import {
	deleteCollection,
	getAllCollections,
} from "../../services/collection.service";
import CollectionCard from "../../components/Card/CollectionCard";
import { emitConfirmation } from "../../modules/swal.module";

const MyCollection = () => {
	const account_id = Number(localStorage.getItem("account_id"));
	const nevigate = useNavigate();

	const [search, setsearch] = useState(null);
	const [collections, setcollections] = useState([]);
	const [displayCollections, setdisplayCollections] = useState([]);

	const loadAllCollections = () => {
		getAllCollections({
			account_id: account_id,
		}).then((response) => {
			setcollections(response.data.collections.reverse());
		});
	};

	const handleDelete = (collectionId, collectionName) => {
		emitConfirmation(
			`Are you sure that you want to delete ${collectionName} ?`,
			async () => {
				deleteCollection(collectionId).then(() => {
					loadAllCollections();
				});
			}
		);
	};

	useEffect(() => {
		if (!search || search === "") {
			setdisplayCollections(collections);
			return;
		} else {
			setdisplayCollections(
				collections.filter((collection) =>
					collection.name.includes(search)
				)
			);
		}
	}, [search, collections]);

	useEffect(loadAllCollections, []);

	return (
		<div className="pt-10 md:pt-24">
			<h1>My Collections</h1>
			<div className="my-4">
				<Row>
					<Col xs={4}>
						<Input
							placeholder="Search Collection ..."
							value={search}
							onChange={(e) => setsearch(e.target.value)}
						/>
					</Col>
					<Col></Col>
					<Col xs={2}>
						<Button
							onClick={() => nevigate("./create")}
							className="text-white"
							color="info"
						>
							Create New Collection
						</Button>
					</Col>
				</Row>
			</div>
			<div>
				{displayCollections.map((collection) => (
					<CollectionCard
						collectionId={collection.collection_id}
						collectionName={collection.name}
						cardClassName="mb-3"
						onDelete={() =>
							handleDelete(
								collection.collection_id,
								collection.name
							)
						}
					/>
				))}
			</div>
		</div>
	);
};

export default MyCollection;
