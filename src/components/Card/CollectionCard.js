import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";

const CollectionCard = ({ cardClassName,collectionName,collectionId }) => {

    const nevigate = useNavigate()

	return (
		<Card className={`p-3 ${cardClassName}`}>
			<Row>
				<Col>
					<b>{ collectionName }</b>
				</Col>
				<Col xs={3}>
					<Button onClick={() => nevigate(`/my/collections/${collectionId}`)} className="text-white mr-3" color="info">
						<FontAwesomeIcon className="pr-2" icon={faPencil} />
						Edit Collection
					</Button>
					<Button color="danger">
						<FontAwesomeIcon icon={faTrash} /> Delete Collection
					</Button>
				</Col>
			</Row>
		</Card>
	);
};

export default CollectionCard;
