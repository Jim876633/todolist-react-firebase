import React from "react";
import { useTodoContext } from "../context/todoContext";
import classes from "./TagButton.module.scss";

const TagButton = ({ tagName }) => {
    const { filterTodoList, setTag, tag } = useTodoContext();

    const tagClickHandler = () => {
        setTag(tagName);
        filterTodoList();
    };

    return (
        <button
            className={`${classes.tagButton} ${
                tagName === tag && classes.active
            }`}
            onClick={tagClickHandler}
        >
            {tagName}
        </button>
    );
};

export default TagButton;
