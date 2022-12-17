import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Header from "../component/Header";
import Modal from "../component/Modal";
import TodoList from "../component/TodoList";
import DetailPage from "./DetailPage";
import LoadingPage from "./LoadingPage";
import classes from "./TodoListPage.module.scss";

import { firebase } from "../api/firebase";
import { useTodoContext } from "../context/todoContext";
import { useLogin } from "../hooks/useLogin";

const TodoListPage = () => {
    const { setEditId, setInitialTodoList } = useTodoContext();

    const { isLogin, isLoading } = useLogin();

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
    useEffect(() => {
        if (isLogin) {
            firebase.getTodoList(setInitialTodoList);
        }
        if (!isLoading && !isLogin) {
            navigate("/");
        }
    }, [isLogin, isLoading]);

    if (isLoading) return <LoadingPage />;

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
