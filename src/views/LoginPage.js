import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import { getAuthorization, login } from "../services/auth.service";

const LoginPage = () => {
    const nevigate = useNavigate();

    const [invalid, setInvalid] = useState({
        username: false,
        password: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = {
            username: e.target.username.value,
            password: e.target.password.value,
        };
        login(body)
            .then((response) => {
                localStorage.setItem("account_id", response.data.account_id);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("token", response.data.token);
                window.location.reload(false);
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setInvalid({ ...invalid, username: true, password: false });
                } 
                else {
                    setInvalid({ ...invalid, username: false, password: true  });
                }
            });
    };

    useEffect(() => {
        getAuthorization().then((response) => {
            if (response.data.result) {
                console.log("Go");
                nevigate("/problems");
            }
        });
    }, [nevigate]);

    return (
        <div>
            <div className="login-card">
                <h1>Login</h1>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            // onChange={(e) => setTestcases(e.target.value)}
                            // value={testcases}
                            invalid={invalid.username}
                            id="username"
                            name="username"
                            type="text"
                            required={true}
                        />
                        <FormFeedback>
                            <p className="text-sm">This username doesn't exists!</p>
                        </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            // onChange={(e) => setTestcases(e.target.value)}
                            // value={testcases}
                            invalid={invalid.password}
                            id="password"
                            name="password"
                            type="password"
                            required={true}
                        />
                        <FormFeedback>
                            <p className="text-sm">Incorrect password! Please try again.</p>
                        </FormFeedback>
                    </FormGroup>
                    <Button
                        className="px-10"
                        type="submit"
                        color="warning"
                        size="lg"
                    >
                        <FontAwesomeIcon className="mr-2" icon={faKey}/>
                        Login
                    </Button>

                    <p className="text-base mt-2">
                        Don't have an account?{" "}
                        <Link to={"/register"}>Create here</Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
