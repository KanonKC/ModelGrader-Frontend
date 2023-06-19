import React from "react";
import {
	Button,
	Container,
	Form,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	acceptConfirmation,
	closeConfirmation,
} from "../redux/confirmation.reducer";

const ConfirmationModal = () => {
	const confirmation = useSelector((state) => state.confirmation);
	const dispatch = useDispatch();

	return (
		<Modal isOpen={confirmation.isOpen} centered={true}>
			<ModalHeader>Confirmation</ModalHeader>
			<Form>
				<ModalBody>
					<Container>
						<h5>{confirmation.message}</h5>
					</Container>
				</ModalBody>
				<ModalFooter>
					<Button
						onClick={() => dispatch(acceptConfirmation())}
						className="w-1/4"
						color="primary"
					>
						Confirm
					</Button>{" "}
					<Button
						onClick={() => dispatch(closeConfirmation())}
						className="w-1/4"
						color="secondary"
					>
						Cancel
					</Button>
				</ModalFooter>
			</Form>
		</Modal>
	);
};

export default ConfirmationModal;
