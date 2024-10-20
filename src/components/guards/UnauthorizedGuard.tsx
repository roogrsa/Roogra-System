import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
    hasPermission: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: Component,
    hasPermission,
    ...rest
}) => {
    return hasPermission ? <Component {...rest} /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
