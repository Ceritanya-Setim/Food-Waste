import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = useCallback((newToken) => {
        setToken(newToken);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
    }, []);

    const value = useMemo(
        () => ({ token, setToken, login, logout }),
        [token, login, logout]
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
