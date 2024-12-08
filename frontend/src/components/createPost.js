import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/CreatePost.css';


function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // 페이지 이동을 위한 훅

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // JWT 토큰 가져오기
        console.log('Retrieved Token:', token); // 토큰 로그 출력

        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/api/posts',
                {
                    title,
                    content,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 추가
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('게시글 생성 성공:', response.data); // 성공 로그 출력

            // 게시글 생성이 성공하면 게시판으로 이동
            alert('게시글이 성공적으로 생성되었습니다!');
            navigate('/board'); // '/board'로 리다이렉션
        } catch (error) {
            console.error('게시글 생성 실패:', error); // 일반 오류 로그
            if (error.response) {
                console.error('Error Response:', error.response); // 서버 에러 응답 로그
            } else {
                console.error('Error Message:', error.message); // 에러 메시지 출력
            }
        }
    };

    return (
        <div>
            <h1>새 게시글 작성</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">작성</button>
            </form>
        </div>
    );
}

export default CreatePost;
