import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./DetailPage.module.scss";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";

import { useTodoContext } from "../context/todoContext";

const DetailPage = () => {
    const navigate = useNavigate();
    const { detailId } = useParams();
    const { getTodoItem } = useTodoContext();

    const detailItem = getTodoItem(detailId);

    useEffect(() => {
        if (!detailItem) {
            navigate("/error");
        }
    }, []);
    if (!detailItem) {
        return;
    }
    return (
        <div className={classes.container}>
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
    );
};

export default DetailPage;
