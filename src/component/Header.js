import React from "react";
import classes from "./Header.module.scss";

import { useTodoContext } from "../context/todoContext";
import { firebase } from "../api/firebase";

import guestImage from "../image/blank-profile-picture.png";

const Header = ({ toggleSidebar }) => {
    const { authData, tagRef, setAuthData, setInitialTodoList } =
        useTodoContext();

    const reg = new RegExp(/[A-Za-z]/);

    const logoutHandler = () => {
        firebase.logout(setAuthData);
        setInitialTodoList([]);
        tagRef.current = "today";
    };

    return (
        <header className={classes.header}>
            <div className={classes.logo}>todo list</div>
            {authData.uid && (
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
