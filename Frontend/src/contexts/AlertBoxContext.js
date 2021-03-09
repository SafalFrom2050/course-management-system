import { createContext, useContext, useState } from 'react';

const AlertBoxMsg = createContext();
const AlertBoxShowMsg = createContext();

export function useAlertBoxMsg() {
    return useContext(AlertBoxMsg);
}

export function useAlertBoxShowMsg() {
    return useContext(AlertBoxShowMsg);
}

export function AlertBoxProvider({ children }) {
    const [alertMsg, setAlertMsg] = useState("");

    function showAlertBox(message, duration=1000) {
        setAlertMsg(message)
        setTimeout(hide, duration)
    }

    function hide() {
        setAlertMsg(null)
    }

    return (
        <AlertBoxMsg.Provider value={alertMsg}>
            <AlertBoxShowMsg.Provider value={showAlertBox}>
                {children}
            </AlertBoxShowMsg.Provider>
        </AlertBoxMsg.Provider>
    );
}