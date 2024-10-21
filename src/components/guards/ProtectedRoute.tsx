import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../../common/Loader';

interface ProtectedRouteProps {
    component: React.ComponentType<any>;
    hasPermission: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: Component,
    hasPermission,
    ...rest
}) => {
    if (hasPermission=1) {
        console.log('hasPermission if',hasPermission);
        return <Component {...rest}/>;
    } else {
        console.log('hasPermission else',hasPermission);
        return <Navigate to="/unauthorized" />;
    }
    // return hasPermission ? <Component {...rest} /> : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;