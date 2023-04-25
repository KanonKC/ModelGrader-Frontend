import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Input, ListGroupItem, Row } from "reactstrap";

const OrderInputListItem = ({ title, value, onChange }) => {
	return (
		<ListGroupItem>
			<Row>
				<Col xs={2}>
					<Input value={value} onChange={onChange} />
				</Col>
				<Col>{title}</Col>
				<Col xs={1}>
					<Button color="danger">
						<FontAwesomeIcon icon={faX} />
					</Button>
				</Col>
			</Row>
		</ListGroupItem>
	);
};

export default OrderInputListItem;
