import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Board.css';

function Board() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const postsPerPage = 5; // 한 페이지당 게시글 수
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

    // 게시글 가져오기
    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('Retrieved Token:', token); // 토큰 출력

        if (token) {
            axios.get('http://localhost:8080/api/posts', {
                headers: {
                    Authorization: `Bearer ${token}`, // JWT 토큰 전송
                },
            })
                .then((response) => {
                    console.log('Fetched Posts:', response.data); // 응답 데이터 출력
                    setPosts(response.data);
                    setIsLoggedIn(true); // 로그인 상태 설정
                })
                .catch((error) => {
                    console.error('Failed to fetch posts:', error); // 오류 출력
                    if (error.response) {
                        console.error('Error Response:', error.response); // 서버 응답 출력
                    }
                    localStorage.removeItem('token'); // 유효하지 않은 토큰 제거
                    setIsLoggedIn(false); // 로그인 상태 해제
                    navigate('/login'); // 인증 실패 시 로그인 페이지로 이동
                });
        } else {
            setIsLoggedIn(false); // 로그인 상태 해제
            navigate('/login');
        }
    }, [navigate]);

    // 페이지네이션 로직
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 글쓰기 버튼 핸들러
    const handleCreateClick = () => {
        if (!isLoggedIn) {
            alert('로그인이 필요합니다.');
            navigate('/login'); // 로그인 안 되어 있으면 로그인 페이지로 이동
        } else {
            navigate('/create'); // 글쓰기 페이지로 이동
        }
    };

    // 게시글 제목 클릭 핸들러
    const handleTitleClick = (postId) => {
        navigate(`/post/${postId}`); // 게시글 상세보기로 이동
    };

    return (
        <div className="board-container">
            <h1 className="board-title">게시판</h1>
            <button className="create-button" onClick={handleCreateClick}>글 쓰기</button>
            <ul className="post-list">
                {currentPosts.map((post) => (
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
