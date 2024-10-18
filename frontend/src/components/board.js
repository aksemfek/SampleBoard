import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Board.css';  // CSS 파일을 import

function Board() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const postsPerPage = 5; // 한 페이지에 보여줄 게시글 수
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // 새로고침 시에도 토큰을 가져옴

    useEffect(() => {
        if (!token) {
            navigate('/login');  // 토큰이 없으면 로그인 페이지로 이동
        } else {
            // JWT 토큰을 Authorization 헤더에 추가하여 게시글을 불러옴
            axios.get('http://localhost:8080/api/posts', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setPosts(response.data); // 서버에서 받은 게시글 데이터를 상태에 저장
                })
                .catch(error => {
                    console.error('Failed to fetch posts:', error);
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem('token');  // 토큰이 유효하지 않으면 삭제
                        navigate('/login');  // 로그인 페이지로 이동
                    }
                });
        }
    }, [token, navigate]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCreateClick = () => {
        navigate('/create'); // 글쓰기 페이지로 이동
    };

    const handleTitleClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="board-container">
            <h1 className="board-title">게시판</h1>
            <button className="create-button" onClick={handleCreateClick}>글 쓰기</button>
            <ul className="post-list">
                {currentPosts.map(post => (
                    <li key={post.id} className="post-item">
                        <h2 onClick={() => handleTitleClick(post.id)} className="post-title">
                            {post.title}
                        </h2>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Board;
