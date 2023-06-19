import React from "react";

const TestCard = ({ whenClick }) => {
	const num = Math.random();
	return <div onClick={() => whenClick(num)}>TestCard {num}</div>;
};

export default TestCard;
