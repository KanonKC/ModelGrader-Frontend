import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Homepage = ({ setshowNavbar }) => {
	const nevigate = useNavigate();

	useEffect(() => {
		setshowNavbar(false);
	}, [setshowNavbar]);

	return (
		<div className="flex h-screen">
			<div className="m-auto text-center">
				<h1 className="text-7xl">Welcome to Model Grader</h1>
				<p className="text-3xl my-10">
					This is very prototype grader software.
				</p>
				<Button
					className="homepage-btn px-4 text-white"
					color="tertiary"
					size="lg"
					onClick={() => {
						nevigate("/problems");
						setshowNavbar(true);
					}}
				>
					<FontAwesomeIcon icon={faPuzzlePiece} className="mr-2" />
					Solving Problem
				</Button>
			</div>
		</div>
	);
};

export default Homepage;
