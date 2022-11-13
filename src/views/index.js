import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuthorization } from "../services/auth.service";
import AllProblem from "./AllProblem";
import CreateProblem from "./CreateProblem";
import EditProblem from "./EditProblems";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import Problem from "./Problem";
import MyProfile from "./MyProfile";
import RegisterPage from "./RegisterPage";

const Views = () => {
    const [isLoggin, setisLoggin] = useState(true);
    useEffect(() => {
        getAuthorization()
            .then((response) => {
                setisLoggin(response.data.result);
            })
            .catch((err) => {});
    }, []);
    return (
        <Routes>
            {/* General Page */}
            <Route path={"/"} element={<Homepage />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/problems"} element={<AllProblem />} />
            <Route path={"/*"} element={<LoginPage />} />
            {
                /* Authentication is Required */
                isLoggin && (
                    <>
                        <Route
                            path={"/problems/create"}
                            element={<CreateProblem />}
                        />
                        <Route
                            path={"/problems/:problem_id"}
                            element={<Problem />}
                        />
                        <Route
                            path={`/my-profile`}
                            element={<MyProfile />}
                        />
                        <Route
                            path={`/edit/:problem_id`}
                            element={<EditProblem />}
                        />
                    </>
                )
            }
        </Routes>
    );
};

export default Views;