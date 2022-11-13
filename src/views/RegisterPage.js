import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { emmitError, emmitSuccess } from "../modules/toast.module";
import { register } from "../services/account.service";

const RegisterPage = () => {
    const nevigate = useNavigate()
    const [regisBody,setregisBody] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [confirmPassword,setconfirmPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(regisBody.password.length < 8){
            emmitError('The password length must be greater than or equal to 8')
        }
        else if(regisBody.password !== confirmPassword){
            emmitError("Password and Confirmation Password doesn't match")
        }
        else{
            register(regisBody).then(response => {
                emmitSuccess("Your account has been created!")
                nevigate('/login')
            })
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <Form onSubmit={e => handleSubmit(e)}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        onChange={(e) => setregisBody({...regisBody,username: e.target.value})}
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
                        onChange={(e) => setregisBody({...regisBody,email: e.target.value})}
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
                        onChange={(e) => setregisBody({...regisBody,password: e.target.value})}
                        value={regisBody.password}
                        id="password"
                        name="password"
                        type="password"
                        required={true}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmation_password">Confirmation Password</Label>
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
                    color="primary"
                    size="lg"
                >
                    Create An Account
                </Button>

            </Form>
        </div>
    );
};

export default RegisterPage;
