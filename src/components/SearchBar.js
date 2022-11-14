import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Input, InputGroup, InputGroupText } from "reactstrap";

const SearchBar = ({ ...args }) => {
    return (
        <div className="search-bar">
            <InputGroup>
                <Input
                    {...args}
                    placeholder="Search"
                    className="mt-2"
                    type="search"
                />
            </InputGroup>
        </div>
    );
};

export default SearchBar;
