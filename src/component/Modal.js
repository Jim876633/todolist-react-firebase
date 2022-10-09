import React from "react";
import classes from "./Modal.module.scss";
import AddTodoForm from "./AddTodoForm";

const Modal = ({ closeModal }) => {
    return (
        <div
            className={classes.modal}
            onClick={(e) => {
                if (e.target.matches(`.${classes.modal}`)) {
                    closeModal(e);
                }
            }}
        >
            <AddTodoForm closeModal={closeModal} />
        </div>
    );
};

export default Modal;
