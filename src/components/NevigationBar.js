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
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import { getAuthorization, logout } from "../services/auth.service";

function NevigationBar({ isShow, isLoggin, setisLoggin }) {
    const [isOpenDropdown, setisOpenDropdown] = useState(false);
    const [toggleCooldown, settoggleCooldown] = useState(false);

    const toggleDropdown = () => {
        if (!toggleCooldown) {
            setisOpenDropdown(!isOpenDropdown);
            settoggleCooldown(true);
            setTimeout(() => settoggleCooldown(false), 100);
        }
    };

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
                            <NavLink className="bg-white" href="/">
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
                        <Nav>
                            
                                    <Dropdown
                                        isOpen={isOpenDropdown}
                                        toggle={toggleDropdown}
                                    >
                                        <DropdownToggle size="xs" className="account-dropdown mr-10">
                                            <div className="text-xl text-black">
                                                <FontAwesomeIcon
                                                    className="mr-2"
                                                    icon={faUser}
                                                />
                                                {localStorage.getItem(
                                                    "username"
                                                )}
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem header>
                                                My Profile
                                            </DropdownItem>
                                            <DropdownItem href="/my-profile">
                                                My Submissions
                                            </DropdownItem>
                                            <DropdownItem>
                                                My Problems
                                            </DropdownItem>
                                            <DropdownItem divider />
                                            <DropdownItem onClick={handleLogout}>
                                                Log Out
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown> 
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
