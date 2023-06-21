import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
	Button,
	Col,
	Form,
	FormGroup,
	Input,
	Label,
	ListGroup,
	Row,
} from "reactstrap";
import RequiredSymbol from "../../../components/RequiredSymbol";
import {
	addAccountAccess,
	addTopicCollection,
	deleteTopic,
	getTopic,
	removeAccountAccess,
	removeTopicCollection,
	updateTopic,
} from "../../../services/topic.service";
import { getAllCollections } from "../../../services/collection.service";
import { useNavigate, useParams } from "react-router-dom";
import OrderInputListItem from "../../../components/OrderInputListItem";
import {
	emitConfirmation,
	emitError,
	emitSuccess,
} from "../../../modules/swal.module";
import Container from "../../../components/Layout/Container";
import { getAllAccounts } from "../../../services/account.service";

const MembersAccess = () => {
	const { topic_id } = useParams();

	const [loading, setLoading] = useState(false);

	const [accounts, setAccounts] = useState([]);
	const [accountOptions, setAccountOptions] = useState([]);

	const [accessAccounts, setAccessAccounts] = useState([]);
    const [addAccounts, setAddAccounts] = useState([]);
    const [removeAccounts, setRemoveAccounts] = useState([]);

    const handleUpdateAccessAccount = (e) => {
        setAddAccounts(e);
    }

	useEffect(() => {
		getAllAccounts().then((response) => {
			setAccounts(response.data.accounts);
		});
	}, []);

	useEffect(() => {
		setAccountOptions(
			accounts.map((account) => ({
				label: account.username,
				value: account.account_id,
			}))
		);
	}, [accounts]);

	useEffect(() => {
		getTopic(topic_id).then((response) => {
			const { data } = response;
			setAccessAccounts(data.topic.access_accounts);
		});
	}, [topic_id]);

	return (
		<div>
			<div className="mb-3">
				<Label>Access Account</Label>
				<Select
					isMulti
					onChange={(e) => handleUpdateAccessAccount(e)}
					options={accountOptions}
				/>
			</div>

			<ListGroup>
				{accessAccounts?.map((account, index) => (
					<OrderInputListItem
						title={account.username}
						disabled
						// onRemove={() => handleRemoveAccessAccount(index)}
					/>
				))}
			</ListGroup>

			<Button
				className="w-1/4"
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

export default MembersAccess;
