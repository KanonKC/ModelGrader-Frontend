import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import { Button, ListGroup } from "reactstrap";
import {
	addAccountAccess,
	getTopic,
	removeAccountAccess,
} from "../../../services/topic.service";
import { useParams } from "react-router-dom";
import OrderInputListItem from "../../../components/OrderInputListItem";
import { emitConfirmation, emitSuccess } from "../../../modules/swal.module";
import { getAllAccounts } from "../../../services/account.service";

const MembersAccess = ({ topic }) => {
	const { topic_id } = useParams();

	const [loading, setLoading] = useState(false);

	const [accounts, setAccounts] = useState([]);
	const [accountOptions, setAccountOptions] = useState([]);

	const [accessAccounts, setAccessAccounts] = useState([]);
	const [addAccounts, setAddAccounts] = useState([]);

	const loadAccessAccounts = useCallback(() => {
		getTopic(topic_id).then((response) => {
			const { data } = response;
			console.log(data.topic.accessed_accounts);
			setAccessAccounts(data.accessed_accounts);

			const accessedAccountIds = data.accessed_accounts.map(
				(account) => account.account_id
			);

			setAccountOptions(
				accounts
					.filter(
						(account) =>
							!accessedAccountIds.includes(account.account_id)
					)
					.map((account) => ({
						label: account.username,
						value: account.account_id,
					}))
			);
		});
	}, [topic_id, accounts]);

	const handleUpdateAccessAccount = (e) => {
		setAddAccounts(e);
	};

	const handleRemoveAccessAccount = (accountId) => {
		emitConfirmation(
			"Are you sure that you want to remove this account?",
			() => {
				removeAccountAccess(topic_id, [accountId]).then(() => {
					emitSuccess("Success", "Account has been removed.");
					loadAccessAccounts();
				});
			}
		);
	};

	const handleSave = () => {
		const addAccountIds = addAccounts.map((account) => account.value);
		setLoading(true);
		addAccountAccess(topic_id, addAccountIds).then(() => {
			emitSuccess("Success", "Accounts have been added.");
			setAddAccounts([]);
			loadAccessAccounts();
			setLoading(false);
		});
	};

	useEffect(() => {
		getAllAccounts().then((response) => {
			setAccounts(response.data.accounts);
		});
	}, []);

	useEffect(() => {
		const accessedAccountIds = accessAccounts.map(
			(account) => account.account_id
		);
		console.log(accessedAccountIds);
		setAccountOptions(
			accounts
				.filter(
					(account) =>
						!accessedAccountIds.includes(account.account_id)
				)
				.map((account) => ({
					label: account.username,
					value: account.account_id,
				}))
		);
	}, [accounts, accessAccounts]);

	useEffect(loadAccessAccounts, [
		topic_id,
		accounts,
		accessAccounts,
		loadAccessAccounts,
	]);

	return (
		<div>
			<h1>Member Access</h1>

			{topic.is_private ? (
				<>
					<div className="mb-3">
						<Select
							isMulti
							value={addAccounts}
							onChange={(e) => handleUpdateAccessAccount(e)}
							options={accountOptions}
						/>
					</div>

					<ListGroup>
						{accessAccounts?.map((account) => (
							<OrderInputListItem
								title={account.username}
								disabled
								onRemove={() =>
									handleRemoveAccessAccount(
										account.account_id
									)
								}
							/>
						))}
					</ListGroup>

					<Button
						className="w-1/4 mt-3"
						type="submit"
						size="lg"
						color="primary"
						disabled={loading}
						onClick={handleSave}
					>
						Save
					</Button>
				</>
			) : (
				<i>Member Access is only available in Private Topic</i>
			)}
		</div>
	);
};

export default MembersAccess;
