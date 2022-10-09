import React from "react";
import classes from "./TagButton.module.scss";
import { useTodoContext } from "../context/todoContext";

const TagButton = ({ tagName }) => {
    const { filterTodoList, tagRef } = useTodoContext();

    const tagClickHandler = () => {
        tagRef.current = tagName;
        filterTodoList();
    };

    return (
        <button
            className={`${classes.tagButton} ${
                tagName === tagRef.current && classes.active
            }`}
            onClick={tagClickHandler}
        >
            {tagName}
        </button>
    );
};

export default TagButton;
