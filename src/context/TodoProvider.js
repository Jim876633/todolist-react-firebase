import React, { useState } from "react";

import { TodoContext } from "./todoContext";

import { firebase } from "../api/firebase";

const TodoProvider = ({ children }) => {
    const [initialTodoList, setInitialTodoList] = useState(null);

    const [editId, setEditId] = useState(null);

    const [authData, setAuthData] = useState(null);

    const [tag, setTag] = useState("today");

    const toggleTodoCheck = (id) => {
        const toggleTodo = initialTodoList.find((item) => item.id === id);
        const newTodo = { ...toggleTodo, check: !toggleTodo.check };
        const newTodoList = initialTodoList.map((item) => {
            return item.id === newTodo.id ? newTodo : item;
        });
        setInitialTodoList(newTodoList);

        firebase.addTodo(newTodo, authData.uid);
    };

    const addTodo = (todo) => {
        const newTodo = initialTodoList.find((item) => item.id === todo.id);
        if (newTodo) {
            const newTodoList = initialTodoList.map((item) => {
                return item.id === todo.id ? todo : item;
            });
            setInitialTodoList(newTodoList);
        } else {
            setInitialTodoList([...initialTodoList, todo]);
        }

        firebase.addTodo(todo);
    };

    const removeTodo = (id) => {
        const newTodoList = initialTodoList.filter((item) => item.id !== id);
        setInitialTodoList(newTodoList);

        firebase.removeTodo(id);
    };

    const filterTodoList = () => {
        if (!initialTodoList) return;
        let newTodoList;
        switch (tag) {
            case "overview":
                newTodoList = initialTodoList;
                break;
            case "today":
                newTodoList = initialTodoList.filter(
                    (item) =>
                        item.date === new Date().toLocaleDateString("en-CA")
                );
                break;
            case "todo":
                newTodoList = initialTodoList.filter(
                    (item) => item.check === false
                );
                break;
            case "finish":
                newTodoList = initialTodoList.filter(
                    (item) => item.check === true
                );
                break;
            default:
                return;
        }
        return newTodoList;
    };

    const clearTodoList = () => {
        const todoList = filterTodoList(initialTodoList);
        const newTodoList = initialTodoList.filter((item) => {
            return !todoList.find((todo) => todo.id === item.id);
        });
        setInitialTodoList(newTodoList);

        firebase.clearTodoList(todoList);
    };

    const sortTodoList = () => {
        const newTodoList = [...initialTodoList];
        newTodoList.sort((a, b) => {
            const prevTime = a.date.split("-").concat(a.time.split(":"));
            const nextTime = b.date.split("-").concat(b.time.split(":"));
            for (let i = 0; i < prevTime.length; i++) {
                if (prevTime > nextTime) {
                    return 1;
                }
                if (prevTime < nextTime) {
                    return -1;
                }
            }
            return 0;
        });
        setInitialTodoList(newTodoList);
    };

    const getTodoItem = (id) => {
        const todoList = filterTodoList(initialTodoList);
        if (!todoList) return;
        //get edit item
        if (editId) {
            const [editTodo] = todoList.filter((item) => item.id === editId);
            if (!editTodo) {
                return undefined;
            }
            return editTodo;
        }

        //get detail item
        const [detailTodo] = todoList.filter(
            (item) => item.id === parseInt(id)
        );
        if (!detailTodo) {
            return undefined;
        }
        const detailItem = {
            priority: detailTodo.priority,
            time: `${detailTodo.date} ${detailTodo.time}`,
            title: detailTodo.title,
            detail: detailTodo.detail,
        };
        return Object.entries(detailItem);
    };
    const logoutResetState = () => {
        setInitialTodoList(null);
        setEditId(null);
        setAuthData(null);
        setTag("today");
    };

    const todoListValue = {
        editId,
        tag,
        authData,
        setTag,
        toggleTodoCheck,
        addTodo,
        logoutResetState,
        removeTodo,
        getTodoItem,
        setEditId,
        filterTodoList,
        sortTodoList,
        clearTodoList,
        setAuthData,
        setInitialTodoList,
    };

    return (
        <TodoContext.Provider value={todoListValue}>
            {children}
        </TodoContext.Provider>
    );
};

export default TodoProvider;
