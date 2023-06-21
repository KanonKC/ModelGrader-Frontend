import React from "react";
import CollectionForm from "../components/Form/CollectionForm";
import Container from "../components/Layout/Container";

const CreateCollection = () => {
	return (
		<Container>
			<h1>Create Collection</h1>
			<CollectionForm />
		</Container>
	);
};

export default CreateCollection;
