import React from "react";
import classes from "./ErrorPage.module.scss";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.container}>
            <div className={classes.error}>
                <div className={classes.text}>
                    oops ! you've landed on the wrong page{" "}
                </div>
                <button
                    className={classes.backButton}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Back to correct page
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
