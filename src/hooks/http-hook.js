import axios from 'axios';
import { useState, useCallback } from 'react';

export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(
        async (url, method = "GET", payload, config) => {
            setIsLoading(true);

            if (method === "GET") {
                axios.get(url, payload, config)
                    .then(result => {
                        return result;
                    }).catch(err => {
                        setError(err);
                    }).finally(() => {
                        setIsLoading(false);
                    })
            } else if (method === "POST") {
                const data = await axios.post(url, payload, config);
                return data;
            }
        }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return { isLoading, error, sendRequest, clearError };
}