import {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    const [currentUser, setCurrentUser] = useState();

    async function login(_username, _password){
        //TODO

        setCurrentUser({username:_username, password:_password});
    }

    async function logout(){
        //TODO

        setCurrentUser(null);
    }

    const value = {
        currentUser,
        login,
        logout
    };

    return(
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    );
}