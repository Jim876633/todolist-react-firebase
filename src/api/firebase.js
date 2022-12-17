import { initializeApp } from "firebase/app";
import {
    getDatabase,
    onValue,
    ref,
    remove,
    set,
    update,
} from "firebase/database";

import {
    FacebookAuthProvider,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";

import { firebaseConfig } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

// fetch data
const db = getDatabase();

const getUser = () => getAuth().currentUser;

const addTodo = (todo) => {
    const user = getUser();
    const updates = {};
    updates[`todoList/${user.uid}/${todo.id}`] = todo;
    update(ref(db), updates);
};

const getTodoList = (updateTodoList) => {
    const user = getUser();
    onValue(
        ref(db, `todoList/${user.uid}`),
        (snapshot) => {
            const data = snapshot.val();
            updateTodoList(Object.values(data || {}));
        },
        { onlyOnce: true }
    );
};

const removeTodo = (id) => {
    const user = getUser();
    remove(ref(db, `todoList/${user.uid}/${id}`));
};

const clearTodoList = (todoList) => {
    const user = getUser();
    todoList.forEach((todo) => {
        remove(ref(db, `todoList/${user.uid}/${todo.id}`));
    });
};

//login detect
const loginListener = (setAuthData) => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
        const data = {
            uid: user?.uid,
            authName: user?.displayName,
            authImage: user?.photoURL,
        };
        setAuthData(data);
        // catch facebook photo with token
        if (user?.photoURL && user.photoURL.includes("facebook")) {
            onValue(
                ref(db, `facebookAPI/${user.uid}`),
                (snapshot) => {
                    const data = snapshot.val();
                    setAuthData((prev) => {
                        return {
                            ...prev,
                            authImage: user.photoURL + "?access_token=" + data,
                        };
                    });
                },
                { onlyOnce: true }
            );
        }
    });
};

const login = (media) => {
    const auth = getAuth();
    let provider;
    if (media === "guest") {
        signInWithEmailAndPassword(auth, "test@gmail.com", "test123")
            .then(() => {
                // Signed in
                console.log("guest login");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    } else {
        switch (media) {
            case "facebook":
                provider = new FacebookAuthProvider();
                break;
            case "google":
                provider = new GoogleAuthProvider();
                break;
            default:
                return;
        }
        signInWithPopup(auth, provider)
            .then((result) => {
                //save facebook token
                if (media === "facebook") {
                    const credential =
                        FacebookAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    const user = getUser();
                    set(ref(db, `facebookAPI/${user.uid}`), token);
                }
                console.log(`${media} login`);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }
};

const logout = async () => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            console.log("sign out");
        })
        .catch((error) => {
            console.log(error);
        });
};

export const firebase = {
    getTodoList,
    addTodo,
    removeTodo,
    clearTodoList,
    login,
    logout,
    loginListener,
};
