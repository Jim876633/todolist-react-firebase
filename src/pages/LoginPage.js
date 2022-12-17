import React, { useEffect } from "react";
import facebook from "../image/Facebook.svg";
import googleIcon from "../image/Google.svg";
import LoadingPage from "./LoadingPage";
import classes from "./LoginPage.module.scss";

import { useNavigate } from "react-router-dom";
import { firebase } from "../api/firebase";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
    const navigate = useNavigate();

    const { isLogin, isLoading } = useLogin();

    useEffect(() => {
        if (isLogin) {
            navigate("/todoList");
        }
    }, [isLogin]);

    if (isLoading) return <LoadingPage />;

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
