import { createContext } from 'react';

const defaultAuthContext = {
    token: null,
    setToken: () => {},
    login: () => {},
    logout: () => {},
};

export const AuthContext = createContext(defaultAuthContext);

    

