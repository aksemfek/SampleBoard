import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Comments from './comments'; // 댓글 컴포넌트 임포트
import '../css/PostDetail.css'; // 스타일 임포트

function PostDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        axios
            .get(`http://localhost:8080/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setPost(response.data);
                const currentUser = JSON.parse(atob(token.split('.')[1])).sub; // JWT 토큰에서 사용자 정보 추출
                setIsAuthor(currentUser === response.data.user.username);
            })
            .catch((error) => {
                console.error('Failed to fetch post:', error);
                navigate('/login');
            });
    }, [id, navigate]);

    const handleEditClick = () => {
        navigate(`/edit/${id}`);
    };

    return (
        <div className="container">
            <div className="post-container">
                {post ? (
                    <>
                        {isAuthor && (
                            <button className="edit-button" onClick={handleEditClick}>
                                수정
                            </button>
                        )}
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                        <Comments postId={id} /> {/* 댓글 컴포넌트 렌더링 */}
                        <button onClick={() => navigate(-1)}>뒤로가기</button>
                    </>
                ) : (
                    <p>게시글을 불러오는 중입니다...</p>
                )}
            </div>
        </div>
    );
}

export default PostDetail;
