import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    async function login(_email, _password) {
        const obj = { email: _email, password: _password };
        let config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        axios.post("http://localhost:5000/student/login", obj, config)
            .then(result => {
                let tokenObj = JSON.stringify(result.data);
                localStorage.setItem("userData", tokenObj);
                setCurrentUser({ email: result.data.email, name: result.data.name });
            })
            .catch(err => {
                console.log(err);
            });

    }

    async function logout() {
        //TODO
        setCurrentUser(null);
    }

    const value = {
        currentUser,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}