import classes from "./LoadingPage.module.scss";

const LoadingPage = () => {
    return (
        <div className={classes.loading}>
            <div className={classes.inner}></div>
        </div>
    );
};

export default LoadingPage;
