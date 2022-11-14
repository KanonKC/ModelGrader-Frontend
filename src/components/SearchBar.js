import React from "react";
import { Input } from "reactstrap";

const SearchBar = ({...args}) => {
    return (
        <div>
            <Input
                {...args}
                placeholder="Search"
                className="mt-2"
                type="search"
            />
        </div>
    );
};

export default SearchBar;
