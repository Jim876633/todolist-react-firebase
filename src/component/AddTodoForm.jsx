import React, { useRef, useState, useEffect } from "react";
import classes from "./AddTodoForm.module.scss";
import { FaTimes } from "react-icons/fa";

import { useTodoContext } from "../context/todoContext";

const AddTodoForm = ({ closeModal }) => {
    const { addTodo, editId, getTodoItem } = useTodoContext();

    const [submitValid, setSubmitValid] = useState({ state: true });

    const prioritys = ["low", "medium", "high"];

    const [priorityClick, setPriorityClick] = useState("medium");

    const [alert, setAlert] = useState({ message: "", success: false });

    const titleRef = useRef();
    const textRef = useRef();
    const dateRef = useRef();
    const timeRef = useRef();

    const options = {
        hour: "2-digit",
        minute: "2-digit",
    };
    const defaultDate = new Date().toLocaleDateString("en-CA");
    const defaultTime = new Date().toLocaleTimeString("en-GB", options);

    const submitTodoHandler = (e) => {
        e.preventDefault();
        if (titleRef.current.value === "") {
            titleRef.current.focus();
            setSubmitValid({ state: false });
            return;
        }
        setSubmitValid({ state: true });
        setAlert({ message: "success", success: true });
        const title = titleRef.current.value;
        const detail = textRef.current.value;
        const priority = priorityClick;
        const date = dateRef.current.value;
        const time = timeRef.current.value;
        const todo = {
            id: editId ? editId : Date.now(),
            title,
            detail,
            priority,
            date,
            time,
            check: false,
        };
        addTodo(todo);
        titleRef.current.value = "";
        textRef.current.value = "";
        editId && closeModal(e);
    };

    const titleEnteredHandler = () => {
        setSubmitValid({ state: true });
        if (titleRef.current.value === "") {
            setSubmitValid({ state: false });
        }
    };

    const priorityClickHandler = (e) => {
        e.preventDefault();
        setPriorityClick(e.target.value);
    };

    useEffect(() => {
        if (editId) {
            const editItem = getTodoItem();
            titleRef.current.value = editItem.title;
            textRef.current.value = editItem.detail;
            dateRef.current.value = editItem.date;
            timeRef.current.value = editItem.time;
            setPriorityClick(editItem.priority);
        }
    }, []);

    useEffect(() => {
        if (!submitValid.state) {
            setAlert({ ...alert, message: "enter some title" });
        }
        const timeId = setTimeout(() => {
            setAlert({ message: "", success: false });
        }, 1100);
        return () => {
            clearTimeout(timeId);
        };
    }, [submitValid]);

    return (
        <form className={classes.form} onSubmit={submitTodoHandler}>
            {alert.message && (
                <div
                    className={`${classes.message} ${
                        alert.success && classes.success
                    }`}
                >
                    {alert.message}
                </div>
            )}
            <button className={classes.closeButton} onClick={closeModal}>
                <FaTimes className={classes.icon} />
            </button>
            <div className={classes.title}>
                {editId ? "edit todo" : "add todo"}
            </div>
            <input
                type="text"
                className={`${classes.titleInput} ${
                    !submitValid.state && classes.inValid
                }`}
                placeholder="title"
                ref={titleRef}
                onChange={titleEnteredHandler}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
            />
            <textarea
                className={classes.detailInput}
                rows="3"
                placeholder="detail..."
                ref={textRef}
            ></textarea>
            <div className={classes.priority}>
                <span className={classes.title}>priority : </span>
                {prioritys.map((priority) => (
                    <button
                        key={priority}
                        className={`${classes[priority + "Button"]} ${
                            priorityClick === priority && classes.active
                        }`}
                        value={priority}
                        onClick={priorityClickHandler}
                    >
                        {priority}
                    </button>
                ))}
            </div>
            <div className={classes.timeBlock}>
                <div className={classes.date}>
                    <label htmlFor="date" className={classes.label}>
                        date :{" "}
                    </label>
                    <input
                        type="date"
                        ref={dateRef}
                        defaultValue={defaultDate}
                    />
                </div>
                <div className={classes.time}>
                    <label htmlFor="time" className={classes.label}>
                        time :{" "}
                    </label>
                    <input
                        type="time"
                        ref={timeRef}
                        defaultValue={defaultTime}
                    />
                </div>
            </div>
            <button type="submit" className={classes.addButton}>
                {editId ? "edit" : "add"}
            </button>
        </form>
    );
};

export default AddTodoForm;
