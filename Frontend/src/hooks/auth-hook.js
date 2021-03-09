import { useState, useEffect, useCallback } from 'react';

export const useAuth = () => {

    const [token, setToken] = useState("");
    const [userName, setUsername] = useState("");
    const [userType, setUserType] = useState("");


    const login = useCallback((recievedData) => {
        setToken(recievedData.token);
        setUsername(recievedData.name);
        let obj = {
            token: recievedData.token,
            name: recievedData.name,
        }
        if (recievedData.userType === "staff") {
            obj.staff_id = recievedData.staff_id;
            obj.module_id = recievedData.module_id;
            obj.userType = "staff";
            setUserType("staff");
        } else {
            obj.student_id = recievedData.student_id;
            obj.userType = "student";
            setUserType("student");
        }
        obj = JSON.stringify(obj);
        localStorage.setItem("userData", obj);
    }, []);

    const logout = useCallback(() => {
        setToken("");
        setUsername("");
        setUserType("");
        localStorage.removeItem('userData');
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token) {
            const recievedData = {
                token: storedData.token,
                name: storedData.name,
            }
            if (storedData.userType === "staff") {
                recievedData.staff_id = storedData.staff_id;
                recievedData.module_id = storedData.module_id;
                recievedData.userType = "staff";
            } else {
                recievedData.student_id = storedData.student_id;
                recievedData.userType = "student";
            }
            login(recievedData);
        }
    }, [login])

    return { token, userName, userType, login, logout };
}

