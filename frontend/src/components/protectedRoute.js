import React from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({
    loggedIn,
    redirectPath = '/login',
    children,
}) => {
    if (!localStorage.getItem('loggedIn')) {
        return <Navigate to={redirectPath} replace />;
    }

  return children;
};