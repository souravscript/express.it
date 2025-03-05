// /Users/souravspace/code/express.it/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/auth" />;
    }

    return children;
};

export default ProtectedRoute;