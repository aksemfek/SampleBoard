import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Board.css';  // CSS 파일을 import

function Board() {
    const [posts] = useState([
        { id: 1, title: "첫 번째 게시글", content: "이것은 첫 번째 게시글의 내용입니다." },
        { id: 2, title: "두 번째 게시글", content: "이것은 두 번째 게시글의 내용입니다." },
        { id: 3, title: "세 번째 게시글", content: "이것은 세 번째 게시글의 내용입니다." },
        { id: 4, title: "네 번째 게시글", content: "이것은 네 번째 게시글의 내용입니다." },
        { id: 5, title: "다섯 번째 게시글", content: "이것은 다섯 번째 게시글의 내용입니다." },
        { id: 6, title: "여섯 번째 게시글", content: "이것은 여섯 번째 게시글의 내용입니다." },
        { id: 7, title: "일곱 번째 게시글", content: "이것은 일곱 번째 게시글의 내용입니다." },
        { id: 8, title: "여덟 번째 게시글", content: "이것은 여덟 번째 게시글의 내용입니다." },
        { id: 9, title: "아홉 번째 게시글", content: "이것은 아홉 번째 게시글의 내용입니다." },
        { id: 10, title: "열 번째 게시글", content: "이것은 열 번째 게시글의 내용입니다." }
    ]);

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const postsPerPage = 5; // 한 페이지에 보여줄 게시글 수
    const navigate = useNavigate();
    const token = localStorage.getItem('token'); // 새로고침 시에도 토큰을 가져옴

    // 새로고침 후에도 인증 상태를 유지하기 위한 effect
    useEffect(() => {
        if (!token) {
            navigate('/login');  // 토큰이 없으면 로그인 페이지로 이동
        }
    }, [token, navigate]);

    // 현재 페이지에 해당하는 게시글을 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(posts.length / postsPerPage);

    // 페이지 변경 처리 함수
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 글쓰기 페이지로 이동
    const handleCreateClick = () => {
        navigate('/create'); // 글쓰기 페이지로 이동
    };

    // 제목을 클릭했을 때 게시글 상세 페이지로 이동
    const handleTitleClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <div className="board-container">
            <h1 className="board-title">게시판</h1>

            <button className="create-button" onClick={handleCreateClick}>글 쓰기</button> {/* 글 쓰기 버튼 */}
            <ul className="post-list">
                {currentPosts.map(post => (
                    <li key={post.id} className="post-item">
                        <h2 onClick={() => handleTitleClick(post.id)} className="post-title">
                            {post.title}
                        </h2>
                    </li>
                ))}
            </ul>

            {/* 페이지네이션 버튼 */}
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
