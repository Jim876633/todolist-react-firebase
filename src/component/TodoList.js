import classes from "./TodoList.module.scss";
import TodoItem from "./TodoItem";
import LoadingPage from "../pages/LoadingPage";
import { FaSortAmountDownAlt, FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

import { useTodoContext } from "../context/todoContext";

const TodoList = ({ openModal }) => {
    const { todoList, clearTodoList, sortTodoList, tagRef } = useTodoContext();

    const showTodoList = () => {
        if (!todoList) {
            return <LoadingPage />;
        }
        if (todoList.length === 0) {
            return (
                <div className={classes.emptyTodoList}>
                    no todo at {tagRef.current} page
                </div>
            );
        }
        return todoList.map((list) => (
            <TodoItem key={list.id} list={list} openModal={openModal} />
        ));
    };
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                {tagRef.current}
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
    );
};

export default TodoList;
