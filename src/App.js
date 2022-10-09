import { Route, Routes, BrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoListPage from "./pages/TodoListPage";
import ErrorPage from "./pages/ErrorPage";

import TodoProvider from "./context/TodoProvider";

function App() {
    return (
        <TodoProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/todolist/*" element={<TodoListPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </TodoProvider>
    );
}

export default App;
