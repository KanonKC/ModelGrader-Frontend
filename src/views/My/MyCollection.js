import React, { useEffect, useState } from "react";
import CollectionTable from "../../components/Table/CollectionTable";
import { Button, Col, Input, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import CollectionProblems from "../../components/CollectionProblems";
import { getAllCollections } from "../../services/collection.service";
import CollectionCard from "../../components/Card/CollectionCard";

const MyCollection = () => {

    const account_id = Number(localStorage.getItem("account_id"))
	const nevigate = useNavigate();

    const [collections,setcollections] = useState([])

	const loadAllCollections = () => {
		getAllCollections({
            account_id: account_id
        }).then(response => {
            setcollections(response.data.collections)
        })
	}

    useEffect(loadAllCollections,[])

	return (
		<div className="pt-10 md:pt-24">
			<h1>My Collections</h1>
			<div className="my-4">
				<Row>
					<Col xs={4}>
						<Input />
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
                {
					collections.map(collection => (
						<CollectionCard collectionId={collection.collection_id} collectionName={collection.name} cardClassName="mb-3"/>
					))
				}
			</div>
		</div>
	);
};

export default MyCollection;
