// REACT IMPORT
import React from 'react';

// ROUTER IMPORT
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// AUTHENTICATION IMPORT
import { isAuthenticated } from './index';

const PrivateRoute = () => {
    const location = useLocation();

    return isAuthenticated() && isAuthenticated().user.role === 1 ? <Outlet /> : <Navigate to={{pathname: '/signin', state: {from: location}}} />;    
};

export default PrivateRoute;