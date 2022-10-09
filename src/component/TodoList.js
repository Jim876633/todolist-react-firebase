import classes from "./TodoList.module.scss";
import TodoItem from "./TodoItem";
import { FaSortAmountDownAlt, FaTrash } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

import { useTodoContext } from "../context/todoContext";

const TodoList = ({ openModal }) => {
    const { todoList, clearTodoList, sortTodoList, tagRef } = useTodoContext();
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
            <div className={classes.todoList}>
                {todoList.map((list) => (
                    <TodoItem key={list.id} list={list} openModal={openModal} />
                ))}
            </div>

            <button className={classes.addTodoButton} onClick={openModal}>
                <MdAdd className={classes.icon} />
            </button>
        </div>
    );
};

export default TodoList;
