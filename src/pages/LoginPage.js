import React, { useEffect } from "react";
import classes from "./LoginPage.module.scss";
import googleIcon from "../image/Google.svg";
import facebook from "../image/Facebook.svg";
import LoadingPage from "./LoadingPage";

import { useNavigate } from "react-router-dom";
import { useTodoContext } from "../context/todoContext";
import { firebase } from "../api/firebase";

const LoginPage = () => {
    const { authData, setAuthData } = useTodoContext();
    const navigate = useNavigate();

    //login listen
    useEffect(() => {
        const removeListener = firebase.loginListener(setAuthData);
        return () => removeListener();
    }, []);

    useEffect(() => {
        if (authData && authData.uid) {
            navigate("/todoList");
        }
    }, [authData]);

    if (!authData || authData.uid) return <LoadingPage />;
    return (
        <div className={classes.container}>
            <div className={classes.login}>
                <div className={classes.title}>todo list</div>
                <button
                    className={classes.button}
                    onClick={() => {
                        firebase.login("google");
                    }}
                >
                    <img
                        src={googleIcon}
                        alt="google"
                        className={classes.icon}
                    />
                    google login
                </button>
                <button
                    className={classes.button}
                    onClick={() => {
                        firebase.login("facebook");
                    }}
                >
                    <img
                        src={facebook}
                        alt="facebook"
                        className={classes.icon}
                    />
                    facebook login
                </button>
                <button
                    className={classes.button}
                    onClick={() => {
                        firebase.login("guest");
                    }}
                >
                    guest login
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
