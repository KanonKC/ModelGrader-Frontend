import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { emitError, emitSuccess } from "../modules/swal.module";
import { register } from "../services/account.service";

const RegisterPage = () => {
	const nevigate = useNavigate();
	const [regisBody, setregisBody] = useState({
		username: "",
		email: "",
		password: "",
	});
	const [confirmPassword, setconfirmPassword] = useState("");
	const [loading, setloading] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (regisBody.password.length < 8) {
			emitError("The password length must be greater than or equal to 8");
		} else if (regisBody.password !== confirmPassword) {
			emitError("Password and Confirmation Password doesn't match");
		} else {
			setloading(true);
			register(regisBody).then((response) => {
				emitSuccess("Your account has been created!");
				setloading(false);
				nevigate("/login");
			});
		}
	};

	return (
		<div className="flex h-screen">
			<div className="m-auto w-1/2 pt-10">
				<h1>Account Register</h1>
				<Form onSubmit={(e) => handleSubmit(e)}>
					<FormGroup>
						<Label for="username">Username</Label>
						<Input
							onChange={(e) =>
								setregisBody({
									...regisBody,
									username: e.target.value,
								})
							}
							value={regisBody.username}
							id="username"
							name="username"
							type="text"
							required={true}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="email">Email</Label>
						<Input
							onChange={(e) =>
								setregisBody({
									...regisBody,
									email: e.target.value,
								})
							}
							value={regisBody.email}
							id="email"
							name="email"
							type="email"
							required={true}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="password">Password</Label>
						<Input
							onChange={(e) =>
								setregisBody({
									...regisBody,
									password: e.target.value,
								})
							}
							value={regisBody.password}
							id="password"
							name="password"
							type="password"
							required={true}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="confirmation_password">
							Confirmation Password
						</Label>
						<Input
							onChange={(e) => setconfirmPassword(e.target.value)}
							value={confirmPassword}
							id="confirmation_password"
							name="confirmation_password"
							type="password"
							required={true}
						/>
					</FormGroup>
					<Button
						className="px-10"
						type="submit"
						color="tertiary"
						size="lg"
						disabled={loading}
					>
						<FontAwesomeIcon className="mr-2" icon={faUserPlus} />
						Register
					</Button>

					<p className="text-base mt-2">
						Already had an account? <Link to={"/login"}>Login</Link>
					</p>
				</Form>
			</div>
		</div>
	);
};

export default RegisterPage;
