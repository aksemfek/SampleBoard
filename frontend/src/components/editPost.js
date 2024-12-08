import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/EditPost.css';

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 게시글 정보 가져오기
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get(`http://localhost:8080/api/posts/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setTitle(response.data.title);
                setContent(response.data.content);
            })
            .catch((error) => {
                console.error('Failed to fetch post for editing:', error);
                navigate('/login');
            });
    }, [id, navigate]);

    // 수정 요청 처리
    const handleSave = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios.put(
            `http://localhost:8080/api/posts/${id}`,
            { title, content },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(() => {
                alert('게시글이 수정되었습니다.');
                navigate(`/post/${id}`);
            })
            .catch((error) => {
                console.error('Failed to update post:', error);
            });
    };

    return (
        <div className="edit-post-container">
            <h1>게시글 수정</h1>
            <div className="form-group">
                <label htmlFor="title">제목</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">내용</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <button className="save-button" onClick={handleSave}>수정</button>
            <button className="cancel-button" onClick={() => navigate(-1)}>취소</button>
        </div>
    );
}

export default EditPost;
