import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token'); // localStorage에서 토큰을 가져옴

    // 토큰이 없으면 로그인 페이지로 이동
    if (!token) {
        return <Navigate to="/login" />;
    }

    // 토큰이 있으면 자식 컴포넌트를 렌더링
    return children;
}

export default PrivateRoute;
