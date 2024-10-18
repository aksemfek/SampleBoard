import React from 'react';
import { Navigate } from 'react-router-dom';

// 로그인 여부에 따라 리다이렉트
const PrivateRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
