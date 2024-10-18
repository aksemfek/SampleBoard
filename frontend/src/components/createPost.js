import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/CreatePost.css';  // CSS 파일 임포트

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // 글 저장 (일단은 콘솔에 출력)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("새로운 게시글:", { title, content });
        // 저장 후 메인 페이지로 이동
        navigate('/');
    };

    return (
        <div className="container">
            <div className="form-container">
                <h1>글 쓰기</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>제목</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>내용</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">저장</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
