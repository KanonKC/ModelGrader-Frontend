import React from "react";
import { Row } from "reactstrap";

const SidebarContainer = ({ children }) => {
	return (
		<div className="w-[99vw]">
			<Row>{children}</Row>
		</div>
	);
};

export default SidebarContainer;
