// /Users/souravspace/code/express.it/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Example: Check authentication status (you can replace this with your actual logic)
    useEffect(() => {
        const checkAuth = () => {
            // Logic to check if user is authenticated
            // For example, check local storage or make an API call
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);