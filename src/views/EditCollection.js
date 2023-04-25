import React from "react";
import CollectionForm from "../components/Form/CollectionForm";
import { useParams } from "react-router-dom";

const EditCollection = () => {
	
    const { collection_id } = useParams()

    return (
		<div className="pt-10 md:pt-24">
			<h1 className="mb-5">Edit Collection</h1>
			<CollectionForm collectionId={collection_id} editMode />
		</div>
	);
};

export default EditCollection;
