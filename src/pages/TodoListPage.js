import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import classes from "./TodoListPage.module.scss";
import Header from "../component/Header";
import TodoList from "../component/TodoList";
import Modal from "../component/Modal";
import DetailPage from "./DetailPage";
import LoadingPage from "./LoadingPage";

import { useTodoContext } from "../context/todoContext";
import { firebase } from "../api/firebase";

const TodoListPage = () => {
    const { setEditId, setAuthData, setInitialTodoList, authData } =
        useTodoContext();

    const [showModal, setShowModal] = useState(false);

    const [showSidebar, setShowSidebar] = useState(false);

    const params = useParams();

    const navigate = useNavigate();

    const closeModal = (e) => {
        e.preventDefault();
        setShowModal(false);
        setEditId(null);
    };
    const openModal = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const toggleSidebar = () => {
        if (!params["*"]) {
            setShowSidebar((prev) => !prev);
        }
    };

    // login Listen
    useEffect(() => {
        const removeListener = firebase.loginListener(setAuthData);
        return () => removeListener();
    }, []);

    useEffect(() => {
        if (authData) {
            if (!authData.uid) {
                navigate("/");
            } else {
                firebase.getTodoList(setInitialTodoList);
            }
        }
    }, [authData && authData?.uid]);

    if (!authData || !authData.uid) return <LoadingPage />;
    return (
        <div className={classes.container}>
            {showModal && <Modal closeModal={closeModal} />}
            <Header toggleSidebar={toggleSidebar} />
            <div
                className={`${classes.backdrop} ${
                    showSidebar && classes.showSidebar
                }`}
                onClick={toggleSidebar}
            ></div>
            <Routes>
                <Route
                    path="/"
                    element={
                        <TodoList
                            openModal={openModal}
                            showSidebar={showSidebar}
                        />
                    }
                />
                <Route path="/:detailId" element={<DetailPage />} />
            </Routes>
        </div>
    );
};

export default TodoListPage;
