import React from "react";
import classes from "./Header.module.scss";

import { firebase } from "../api/firebase";
import { useTodoContext } from "../context/todoContext";

import guestImage from "../image/blank-profile-picture.png";

const Header = ({ toggleSidebar }) => {
    const { authData, logoutResetState } = useTodoContext();

    const reg = new RegExp(/[A-Za-z]/);

    const logoutHandler = () => {
        logoutResetState();
        firebase.logout();
    };

    return (
        <header className={classes.header}>
            <div className={classes.logo}>todo list</div>
            {authData?.uid && (
                <div className={classes.profile}>
                    <div className={classes.greet}>
                        <span
                            className={
                                reg.exec("123")
                                    ? classes.name
                                    : classes.nameChinese
                            }
                        >
                            {authData.authName || "guest"}
                        </span>
                        welcome back !
                    </div>
                    <div className={classes.imageBlock} onClick={toggleSidebar}>
                        <img
                            src={authData.authImage || guestImage}
                            className={classes.image}
                            alt="user"
                        />
                    </div>
                </div>
            )}
            <button className={classes.logoutButton} onClick={logoutHandler}>
                logout
            </button>
        </header>
    );
};

export default Header;
