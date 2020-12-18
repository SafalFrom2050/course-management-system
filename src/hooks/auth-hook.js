import { useState, useEffect, useCallback } from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [userName, setUsername] = useState("");

    const login = useCallback((recievedData) => {
        setToken(recievedData.token);
        setUsername(recievedData.name);
        let obj = {
            token: recievedData.token,
            name: recievedData.name,
            student_id: recievedData.student_id
        }
        obj = JSON.stringify(obj);
        localStorage.setItem("userData", obj);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUsername(null);
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        console.log(storedData);
        if (storedData && storedData.token) {
            console.log("Called");
            const recievedData = {
                token: storedData.token,
                name: storedData.name,
                student_id: storedData.student_id
            }
            login(recievedData)
        }
    }, [login])

    return { token, userName, login, logout };
}

