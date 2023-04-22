import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuthorization } from "../services/auth.service";
import AllProblem from "./AllProblem";
import CreateProblem from "./CreateProblem";
import EditProblem from "./EditProblem";
import Homepage from "./Homepage";
import LoginPage from "./LoginPage";
import Problem from "./Problem";
import MyProfile from "./My/MyProfile";
import RegisterPage from "./RegisterPage";
import Dummy from "./Dummy";
import MySubmission from "./My/MySubmission";
import MyProblem from "./My/MyProblem";
import Profile from "./Profile";
import MyTopic from "./My/MyTopic";
import CreateTopic from "./CreateTopic";
import { AdminPermContext, AuthContext } from "../App";
import Topics from "./Topics";
import Topic from "./Topics/Topic";

const Views = ({setshowNavbar}) => {

    const [isLoggin] = useContext(AuthContext)
    const [isAdmin] = useContext(AdminPermContext)

    useEffect(()=>{
        console.log(isAdmin)
    },[isAdmin])
    
    return (
        <Routes>
            {/* General Page */}
            <Route path={"/"} element={<Homepage setshowNavbar={setshowNavbar}/>} />
            <Route path={"/dummy"} element={<Dummy />} />
            <Route path={"/register"} element={<RegisterPage />} />
            <Route path={"/problems"} element={<AllProblem />} />
            <Route path={"/profiles/:account_id"} element={<Profile />} />
            <Route path={"/*"} element={<LoginPage />} />
            {
            /* Authentication is Required */
                isLoggin && (
                    <>  
                        <Route
                            path={"/problems/:problem_id"}
                            element={<Problem />}
                        />
                        <Route
                            path={"/topics"}
                            element={<Topics />}
                        />
                        <Route
                            path={"/topics/:topic_id"}
                            element={<Topic/>}
                        />
                        <Route
                            path={`/my`}
                            element={<MyProfile />}
                        />
                        <Route
                            path={`/my/submissions`}
                            element={<MySubmission />}
                        />
                        
                    </>
                )
            }
            {
            /* Admin permission is Required */
                isLoggin && isAdmin && (
                    <>
                        <Route
                            path={"/problems/create"}
                            element={<CreateProblem />}
                        />
                         <Route
                            path={"/topics/create"}
                            element={<CreateTopic />}
                        />
                        <Route
                            path={`/my/problems`}
                            element={<MyProblem />}
                        />
                        <Route
                            path={`/my/topics`}
                            element={<MyTopic />}
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
