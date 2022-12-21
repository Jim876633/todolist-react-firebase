import React, { useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import Header from "../component/Header";
import Modal from "../component/Modal";
import TodoList from "../component/TodoList";
import DetailPage from "./DetailPage";
import classes from "./TodoListPage.module.scss";

import { useTodoContext } from "../context/todoContext";

const TodoListPage = () => {
    const { setEditId } = useTodoContext();

    const [showModal, setShowModal] = useState(false);

    const [showSidebar, setShowSidebar] = useState(false);

    const params = useParams();

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
