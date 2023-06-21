import React from "react";
import { Col } from "reactstrap";

const SidebarLayoutContent = ({ children }) => {
	return (
		<Col>
			<div className="h-[97vh] pt-24 ml-5 mr-20">{children}</div>
		</Col>
	);
};

export default SidebarLayoutContent;
