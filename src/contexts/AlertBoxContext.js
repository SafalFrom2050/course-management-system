import { createContext, useContext, useState } from 'react';

const AlertBoxContext = createContext();

export function useAlertBox() {
    return useContext(AlertBoxContext);
}

export function AlertBoxProvider({ children }) {
    const [alertMsg, setAlertMsg] = useState('Hello, this is working...');

    function showAlertBox(message) {
        setAlertMsg(message);
        setTimeout(hide, 1000);
    }

    function hide() {
        setAlertMsg(null);
    }

    const value = {
        showAlertBox,
        alertMsg
    };

    return (
        <AlertBoxContext.Provider value={value}>
            {children}
        </AlertBoxContext.Provider>
    );
}