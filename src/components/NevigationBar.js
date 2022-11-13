import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import {
    faBorderAll,
    faPlus,
    faRightFromBracket,
    faRightToBracket,
    faUser,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { getAuthorization, logout } from "../services/auth.service";

function NevigationBar({ isShow, isLoggin, setisLoggin }) {
    const handleLogout = () => {
        logout();
        setisLoggin(false);
        window.location.reload(false);
    };

    useEffect(() => {
        getAuthorization()
            .then((response) => {
                setisLoggin(response.data.result);
            })
            .catch((err) => {});
    }, []);

    return (
        <div className="nevigation-bar">
            {isShow ? (
                <Navbar light color="primary" fixed="top">
                    <Nav>
                        <NavItem>
                            <NavLink className=" bg-white" href="/">
                                <FontAwesomeIcon
                                    icon={faClipboard}
                                    className="pr-2"
                                />
                                ModelGrader
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="mx-3" href="/problems">
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faBorderAll}
                                />
                                All Problems
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/problems/create">
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faPlus}
                                />
                                Create
                            </NavLink>
                        </NavItem>
                        <NavItem></NavItem>
                    </Nav>
                    {isLoggin ? (
                        <Nav className="float-right">
                            <NavLink className="login-btn" href={`/my-profile`}>
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faUser}
                                />
                                {localStorage.getItem("username")}
                            </NavLink>
                            <NavLink
                                onClick={handleLogout}
                                className="login-btn mx-2"
                                href="/"
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faRightFromBracket}
                                />
                                Logout
                            </NavLink>
                        </Nav>
                    ) : (
                        <Nav className="float-right">
                            <NavLink className="login-btn" href="/login">
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faRightToBracket}
                                />
                                Login
                            </NavLink>
                            <NavLink
                                className="login-btn mx-2"
                                href="/register"
                            >
                                <FontAwesomeIcon
                                    className="mr-2"
                                    icon={faUserPlus}
                                />
                                Register
                            </NavLink>
                        </Nav>
                    )}
                </Navbar>
            ) : (
                <Navbar light color="primary" fixed="top">
                    <Nav>
                        <NavItem>
                            <NavLink className=" bg-white" href="/">
                                <FontAwesomeIcon
                                    icon={faClipboard}
                                    className="pr-2"
                                />
                                ModelGrader
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            )}
        </div>
    );
}

export default NevigationBar;
