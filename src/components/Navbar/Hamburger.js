import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	Nav,
	NavItem,
	NavLink,
} from "reactstrap";

function Hamburger(props) {
	const [collapsed, setCollapsed] = useState(true);

	const toggleNavbar = () => setCollapsed(!collapsed);

	return (
		<div>
			<Navbar color="primary">
				<Nav>
					<NavItem>
						<NavLink className="bg-white" href="/">
							<FontAwesomeIcon
								icon={faClipboard}
								className="pr-2"
							/>
							ModelGrader
						</NavLink>
					</NavItem>
				</Nav>
				<NavbarToggler onClick={toggleNavbar} className="me-2" />
				<Collapse isOpen={!collapsed} navbar>
					<Nav navbar>
						<NavItem>
							<NavLink href="/components/">Components</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="https://github.com/reactstrap/reactstrap">
								GitHub
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
}

export default Hamburger;
