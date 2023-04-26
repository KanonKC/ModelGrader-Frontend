import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "reactstrap";

const CollectionCard = ({
	cardClassName,
	collectionName,
	collectionId,
	onDelete,
}) => {
	const nevigate = useNavigate();

	return (
		<Card className={`py-2 ${cardClassName}`}>
			<Row>
				<Col>
					<div className="mt-2 ml-5 text-base">
						<b>{collectionName}</b>
					</div>
				</Col>
				<Col xs={3}>
					<Button
						onClick={() =>
							nevigate(`/my/collections/${collectionId}`)
						}
						className="text-white mr-3"
						color="info"
					>
						<FontAwesomeIcon className="pr-2" icon={faPencil} />
						Edit Collection
					</Button>
					<Button onClick={onDelete} color="danger">
						<FontAwesomeIcon icon={faTrash} /> Delete Collection
					</Button>
				</Col>
			</Row>
		</Card>
	);
};

export default CollectionCard;
