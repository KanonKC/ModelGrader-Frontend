import React, { useEffect, useState } from "react";

const SidebarChoice = ({ isSelected = false }) => {
	const [bgColor, setBgColor] = useState("#ffc507");

	useEffect(() => {
		if (isSelected) {
			setBgColor("#ffc507");
		} else {
			setBgColor(null);
		}
	}, [isSelected]);

	return (
		<div
			onMouseEnter={() => {
				if (!isSelected) {
					setBgColor("#eeeeee");
				}
			}}
			onMouseLeave={() => {
				if (!isSelected) {
					setBgColor(null);
				}
			}}
			style={{
				backgroundColor: bgColor,
				// fontWeight: "bold",
			}}
			className="p-1 rounded my-3 cursor-pointer"
		>
			<span className="ml-2">General Settings</span>
		</div>
	);
};

export default SidebarChoice;
