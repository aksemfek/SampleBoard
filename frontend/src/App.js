import React, { useState } from 'react';  // useState 추가
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './components/board';   // 게시판 목록 컴포넌트
import PostDetail from './components/postDetail';  // 게시글 상세 페이지 컴포넌트
import CreatePost from './components/createPost';  // 글 쓰기 페이지 컴포넌트
import Login from './components/login'; // 로그인 페이지
import SignUp from './components/signUp'; // 회원가입 페이지
import PrivateRoute from './privateRoute'; // 보호된 경로


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    return (
        <Router>
            <Routes>
                {/* 로그인 페이지 */}
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<SignUp />} />

                {/* 보호된 페이지 (로그인이 필요) */}
                <Route path="/" element={<PrivateRoute isLoggedIn={isLoggedIn}><Board /></PrivateRoute>} />
                <Route path="/post/:id" element={<PrivateRoute isLoggedIn={isLoggedIn}><PostDetail /></PrivateRoute>} />
                <Route path="/create" element={<PrivateRoute isLoggedIn={isLoggedIn}><CreatePost /></PrivateRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
