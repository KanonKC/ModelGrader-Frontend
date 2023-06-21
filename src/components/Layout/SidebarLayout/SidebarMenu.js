import React from "react";
import { Col, Row } from "reactstrap";
import SidebarChoice from "../../SidebarChoice";
import BackButton from "../../Button/BackButton";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const SidebarMenu = ({ children }) => {
	return (
		<Col xs={2}>
			<div style={{ display: "flex", height: "100%" }}>
				<Sidebar>
					<Menu className="pt-24">
						{children}
						{/*Example child: <MenuItem> Documentation</MenuItem> */}
					</Menu>
				</Sidebar>
			</div>
		</Col>
	);
};

export default SidebarMenu;
