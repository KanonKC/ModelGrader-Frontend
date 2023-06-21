import React, { useEffect, useState } from "react";
import Container from "../../../components/Layout/Container";
import { getTopic } from "../../../services/topic.service";
import { useParams } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import CreatorCollectionProblem from "../../../components/CreatorCollectionProblem";
import SidebarMenu from "../../../components/Layout/SidebarLayout/SidebarMenu";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import SidebarLayoutContent from "../../../components/Layout/SidebarLayout/SidebarLayoutContent";
import SidebarContainer from "../../../components/Layout/SidebarLayout/SidebarContainer";
import EditTopic from "./EditTopic";
import { Col, Row } from "reactstrap";
import AllProblem from "./../../AllProblem";
import EditTopicCollection from "./EditTopicCollection";
import MembersAccess from "./MembersAccess";

const MyTopicDashboard = () => {
	const { topic_id } = useParams();

	const [topic, settopic] = useState({});
	const [collections, setcollections] = useState([]);
	const [selectedNo, setselectedNo] = useState(0);

	useEffect(() => {
		getTopic(topic_id).then((response) => {
			// console.log(response.data);
			settopic(response.data.topic);
			setcollections(response.data.collections);
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
					<MembersAccess />
				</SidebarLayoutContent>
			)}
		</SidebarContainer>
	);
};

export default MyTopicDashboard;
