import React from "react";
import classes from "./TodoItem.module.scss";
import { Link } from "react-router-dom";

import { FaCheck, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useTodoContext } from "../context/todoContext";

const TodoItem = ({ list, openModal }) => {
    const { toggleTodoCheck, removeTodo, setEditId, tagRef } = useTodoContext();

    const { id, title, priority, date, time, check } = list;

    const toggleCheckHandler = () => {
        toggleTodoCheck(id);
    };

    const removeTodoHandler = (e) => {
        e.stopPropagation();
        removeTodo(id);
    };
    const editTodoHandler = (e) => {
        e.stopPropagation();
        if (check) return;
        setEditId(id);
        openModal(e);
    };

    const linkToDetail = (e) => {
        e.stopPropagation();
        if (check) e.preventDefault();
    };

    return (
        <div className={`${classes.todoItem} ${check && classes.finish}`}>
            <div className={classes.checkbox} onClick={toggleCheckHandler}>
                {check && <FaCheck className={classes.check} />}
            </div>
            <div className={classes.title} onClick={toggleCheckHandler}>
                {title.length <= 10 ? title : title.slice(0, 10) + "..."}
            </div>
            <div className={`${classes.priority} ${classes[priority]}`}>
                {priority}
            </div>
            <div className={classes.time}>
                {tagRef.current === "today" ? time : date.replace(/-/g, "/")}
            </div>
            <Link
                className={classes.detailButton}
                to={`/todolist/${id}`}
                onClick={linkToDetail}
            >
                detail
            </Link>
            <button
                className={
                    check ? classes.editButtonInvalid : classes.editButton
                }
                onClick={editTodoHandler}
            >
                <FaEdit className={classes.icon} />
            </button>
            <button
                className={classes.removeButton}
                onClick={removeTodoHandler}
            >
                <FaTrashAlt className={classes.icon} />
            </button>
        </div>
    );
};

export default TodoItem;
