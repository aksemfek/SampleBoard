import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginSignUp.css';  // CSS 파일 임포트

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/signup', {
                username,
                email,
                password
            });

            if (response.data.success) {
                setSuccessMessage('Sign up successful!');
                setErrorMessage('');
                setTimeout(() => navigate('/login'), 2000);  // 2초 후 로그인 페이지로 이동
            } else {
                setErrorMessage('Sign up failed: ' + response.data.message);
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('An error occurred: ' + error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>

                {/* 에러 메시지 */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {/* 성공 메시지 */}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
}

export default SignUp;
