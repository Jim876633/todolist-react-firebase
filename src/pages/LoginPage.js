import React from "react";
import facebook from "../image/Facebook.svg";
import googleIcon from "../image/Google.svg";
import classes from "./LoginPage.module.scss";
import { firebase } from "../api/firebase";

const LoginPage = () => {
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
