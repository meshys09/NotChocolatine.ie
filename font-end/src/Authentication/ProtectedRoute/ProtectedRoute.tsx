import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: number }) {
    const token = localStorage.getItem('token');
    const userRole = parseInt(localStorage.getItem('userRole') || '0', 10);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole !== undefined && userRole < requiredRole) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;