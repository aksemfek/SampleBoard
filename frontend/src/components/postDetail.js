import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail() {
    // 하드코딩된 게시글 데이터
    const [posts] = useState([
        { id: 1, title: "첫 번째 게시글", content: "이것은 첫 번째 게시글의 내용입니다." },
        { id: 2, title: "두 번째 게시글", content: "이것은 두 번째 게시글의 내용입니다." },
        { id: 3, title: "세 번째 게시글", content: "이것은 세 번째 게시글의 내용입니다." },
        { id: 4, title: "네 번째 게시글", content: "이것은 네 번째 게시글의 내용입니다." },
        { id: 5, title: "다섯 번째 게시글", content: "이것은 다섯 번째 게시글의 내용입니다." }
    ]);

    const { id } = useParams(); // URL에서 게시글 ID 가져오기
    const post = posts.find(p => p.id === parseInt(id)); // 해당 ID의 게시글 찾기
    const navigate = useNavigate();

    return (
        <div>
            {post ? (
                <>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                    <button onClick={() => navigate(-1)}>뒤로가기</button> {/* 뒤로가기 버튼 */}
                </>
            ) : (
                <p>해당 게시글을 찾을 수 없습니다.</p>
            )}
        </div>
    );
}

export default PostDetail;
