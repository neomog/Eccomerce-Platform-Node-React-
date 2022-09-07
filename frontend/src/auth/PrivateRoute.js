// import React, { Component } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { isAuthenticated } from './index';

// const PrivateRoute = ({component: Component, ...rest}) => (
//   <Route {...rest} render={props => isAuthenticated() ? (
//     <Component {...props} />
//   ) : (
//     <Navigate to={{pathname: '/signin', state:{from: props.location}}} />
//   )}
//   />
// )

// export default PrivateRoute;

import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { isAuthenticated } from './index';

const PrivateRoute = () => {
    const location = useLocation();

    return isAuthenticated() ? <Outlet /> : <Navigate to={{pathname: '/signin', state: {from: location}}} />;    
};

export default PrivateRoute;