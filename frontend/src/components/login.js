import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginSignUp.css';  // CSS 파일 임포트

function Login({ setIsLoggedIn }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/login', {
                username,
                password,
            });

            if (response.data.success) {
                localStorage.setItem('token', response.data.token);  // JWT 토큰을 localStorage에 저장
                setIsLoggedIn(true);
                navigate('/');  // 로그인 성공 후 게시판으로 이동
            } else {
                alert('로그인 실패: ' + response.data.message);
            }
        } catch (error) {
            alert('서버 오류 발생');
        }
    };

    const handleSignUpClick = () => {
        navigate('/signup');
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">로그인</button>
                </form>
                <button className="signup-button" onClick={handleSignUpClick}>
                    회원가입
                </button>
            </div>
        </div>
    );
}

export default Login;
