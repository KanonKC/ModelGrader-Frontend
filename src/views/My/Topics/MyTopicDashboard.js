import React, { useEffect, useState } from "react";
import { getTopic } from "../../../services/topic.service";
import { useParams } from "react-router-dom";
import SidebarMenu from "../../../components/Layout/SidebarLayout/SidebarMenu";
import { MenuItem } from "react-pro-sidebar";
import SidebarLayoutContent from "../../../components/Layout/SidebarLayout/SidebarLayoutContent";
import SidebarContainer from "../../../components/Layout/SidebarLayout/SidebarContainer";
import EditTopic from "./EditTopic";
import { Col, Row } from "reactstrap";
import EditTopicCollection from "./EditTopicCollection";
import MembersAccess from "./MembersAccess";
import ViewTopicSubmission from "./ViewTopicSubmission";

const MyTopicDashboard = () => {
	const { topic_id } = useParams();

	const [topic, settopic] = useState({});
	const [selectedNo, setselectedNo] = useState(4);

	useEffect(() => {
		getTopic(topic_id).then((response) => {
			settopic(response.data.topic);
		});
	}, [topic_id]);

	return (
		<SidebarContainer>
			<SidebarMenu>
				<MenuItem onClick={() => setselectedNo(0)}>Statistic</MenuItem>
				<MenuItem onClick={() => setselectedNo(1)}>
					General Setting
				</MenuItem>
				<MenuItem onClick={() => setselectedNo(2)}>
					Collections
				</MenuItem>
				<MenuItem onClick={() => setselectedNo(3)}>
					Members Access
				</MenuItem>
				<MenuItem onClick={() => setselectedNo(4)}>
					View Submissions
				</MenuItem>
			</SidebarMenu>

			{selectedNo === 0 && (
				<SidebarLayoutContent>
					<Row>
						<Col>A</Col>
						<Col>B</Col>
					</Row>
				</SidebarLayoutContent>
			)}

			{selectedNo === 1 && (
				<SidebarLayoutContent>
					<EditTopic />
				</SidebarLayoutContent>
			)}

			{selectedNo === 2 && (
				<SidebarLayoutContent>
					<EditTopicCollection />
				</SidebarLayoutContent>
			)}

			{selectedNo === 3 && (
				<SidebarLayoutContent>
					<MembersAccess topic={topic} />
				</SidebarLayoutContent>
			)}

			{selectedNo === 4 && (
				<SidebarLayoutContent>
					<ViewTopicSubmission topic={topic} />
				</SidebarLayoutContent>
			)}
		</SidebarContainer>
	);
};

export default MyTopicDashboard;
