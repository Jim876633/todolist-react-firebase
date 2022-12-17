import { FaSortAmountDownAlt, FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import TodoItem from "./TodoItem";
import classes from "./TodoList.module.scss";

import { firebase } from "../api/firebase";
import { useTodoContext } from "../context/todoContext";
import Loading from "./Loading";
import TagButton from "./TagButton";

const tagsItem = ["overview", "today", "todo", "finish"];

const TodoList = ({ openModal, showSidebar }) => {
    const {
        filterTodoList,
        clearTodoList,
        sortTodoList,
        logoutResetState,
        tag,
    } = useTodoContext();

    const logoutHandler = () => {
        logoutResetState();
        firebase.logout();
    };

    const showTodoList = () => {
        const todoList = filterTodoList();
        if (!todoList) {
            return <Loading />;
        }
        if (todoList.length === 0) {
            return (
                <div className={classes.emptyTodoList}>
                    no todo at {tag} page
                </div>
            );
        }
        return todoList.map((list) => (
            <TodoItem key={list.id} list={list} openModal={openModal} />
        ));
    };

    return (
        <div className={classes.container}>
            <div
                className={`${classes.tagsButton} ${
                    showSidebar && classes.showSidebar
                }`}
            >
                {tagsItem.map((tagName) => (
                    <TagButton key={tagName} tagName={tagName} />
                ))}
                <button
                    className={classes.logoutButton}
                    onClick={logoutHandler}
                >
                    logout
                </button>
            </div>
            <div className={classes.todoListCard}>
                <div className={classes.title}>
                    {tag}
                    <div className={classes.buttons}>
                        <button
                            className={classes.sortButton}
                            onClick={sortTodoList}
                        >
                            <FaSortAmountDownAlt className={classes.icon} />
                        </button>
                        <button
                            className={classes.clearButton}
                            onClick={clearTodoList}
                        >
                            <FaTrash className={classes.icon} />
                        </button>
                    </div>
                </div>
                <div className={classes.todoList}>{showTodoList()}</div>

                <button className={classes.addTodoButton} onClick={openModal}>
                    <MdAdd className={classes.icon} />
                </button>
            </div>
        </div>
    );
};

export default TodoList;
