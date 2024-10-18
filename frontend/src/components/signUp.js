import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginSignUp.css'; // CSS 파일 import

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/signup', {
                username,
                password,
            });

            if (response.data.success) {
                alert('회원가입 성공');
                navigate('/login'); // 회원가입 성공 후 로그인 페이지로 이동
            } else {
                alert('회원가입 실패: ' + response.data.message);
            }
        } catch (error) {
            alert('서버 오류 발생');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>회원가입</h1>
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
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
