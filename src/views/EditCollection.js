import React from "react";
import CollectionForm from "../components/Form/CollectionForm";
import { useParams } from "react-router-dom";
import Container from "../components/Container";

const EditCollection = () => {
	const { collection_id } = useParams();

	return (
		<Container>
			<h1 className="mb-5">Edit Collection</h1>
			<CollectionForm collectionId={collection_id} editMode />
		</Container>
	);
};

export default EditCollection;
