import React, { useEffect } from "react";
import { TiArrowBack } from "react-icons/ti";
import { Link, useNavigate, useParams } from "react-router-dom";
import classes from "./DetailPage.module.scss";

import { useTodoContext } from "../context/todoContext";
import LoadingPage from "./LoadingPage";

const DetailPage = () => {
    const navigate = useNavigate();
    const { detailId } = useParams();
    const { getTodoItem, filterTodoList } = useTodoContext();

    const todoList = filterTodoList();

    const detailItem = getTodoItem(detailId);

    useEffect(() => {
        if (todoList && !detailItem) {
            navigate("/error");
        }
    }, [detailItem, todoList]);

    if (!detailItem) {
        return <LoadingPage />;
    }

    return (
        <div className={classes.container}>
            <div className={classes.detailCard}>
                <Link className={classes.backButton} to={"/todolist"}>
                    <TiArrowBack className={classes.icon} />
                </Link>
                <div className={classes.title}>detail</div>
                {detailItem.map(([itemTitle, value]) => (
                    <div className={classes.item} key={itemTitle}>
                        <span className={classes.itemTitle}>
                            {itemTitle}
                            {"  "}:
                        </span>
                        <span
                            className={`${classes[itemTitle]} ${
                                itemTitle === "priority" && classes[value]
                            }`}
                        >
                            {value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DetailPage;
