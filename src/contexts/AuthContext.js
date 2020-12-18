import { createContext } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userName: null,
    token: null,
    login: () => { },
    logout: () => { }
});





