import React from "react";
import { Col } from "reactstrap";
import { Sidebar, Menu } from "react-pro-sidebar";

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
