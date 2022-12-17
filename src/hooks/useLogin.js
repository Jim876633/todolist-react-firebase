import { useEffect, useState } from "react";
import { firebase } from "../api/firebase";
import { useTodoContext } from "../context/todoContext";

export const useLogin = () => {
    const { authData, setAuthData } = useTodoContext();

    const [isLogin, setIsLogin] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const removeListener = firebase.loginListener(setAuthData);
        return () => removeListener();
    }, []);

    useEffect(() => {
        if (authData) {
            if (authData.uid) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
            setIsLoading(false);
        }
    }, [authData]);
    return { isLogin, isLoading };
};
