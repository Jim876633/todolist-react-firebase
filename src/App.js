import {
    BrowserRouter,
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import TodoListPage from "./pages/TodoListPage";

import { useLayoutEffect } from "react";
import { firebase } from "./api/firebase";
import { useTodoContext } from "./context/todoContext";
import TodoProvider from "./context/TodoProvider";
import { useLogin } from "./hooks/useLogin";
import LoadingPage from "./pages/LoadingPage";

function App() {
    return (
        <TodoProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<RouteDetectLogin />}>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/todolist/*" element={<TodoListPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </TodoProvider>
    );
}

const RouteDetectLogin = () => {
    const { setInitialTodoList } = useTodoContext();

    const navigate = useNavigate();

    const location = useLocation();

    const { isLogin, isLoading } = useLogin();

    //useLayoutEffect fix redirect from loginPage to todoListPage having a flash
    useLayoutEffect(() => {
        if (isLogin) {
            firebase.getTodoList(setInitialTodoList);
            if (location.pathname === "/") {
                navigate("/todoList");
            }
        }

        if (!isLoading && !isLogin) {
            navigate("/");
        }
    }, [isLogin, isLoading, location.pathname]);

    if (isLoading) return <LoadingPage />;
    return <Outlet />;
};

export default App;
