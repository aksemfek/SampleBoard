import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Comments.css';

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const token = localStorage.getItem('token');

    // 댓글 목록 가져오기
    useEffect(() => {
        if (!token) {
            console.error("No token found");
            return;
        }
        axios.get(`http://localhost:8080/api/posts/${postId}/comments`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => setComments(response.data))
            .catch(error => console.error('Failed to fetch comments:', error));
    }, [postId, token]);

    // 댓글 추가
    const handleAddComment = () => {
        if (!newComment.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }
        axios.post(
            `http://localhost:8080/api/posts/${postId}/comments`,
            { content: newComment },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch(error => console.error('Failed to add comment:', error));
    };

    // 댓글 삭제
    const handleDeleteComment = (commentId) => {
        axios.delete(
            `http://localhost:8080/api/posts/${postId}/comments/${commentId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(() => {
                setComments(comments.filter(comment => comment.id !== commentId));
            })
            .catch(error => console.error('Failed to delete comment:', error));
    };

    return (
        <div className="comments-section">
            <h2 className="comments-title">댓글</h2>
            <ul className="comments-list">
                {comments.map(comment => (
                    <li key={comment.id} className="comment-item">
                        <p className="comment-content">{comment.content}</p>
                        <small className="comment-author">
                            {comment.user.username !== JSON.parse(atob(token.split('.')[1])).sub
                                ? comment.user.username
                                : ""}
                        </small>
                        {comment.user.username === JSON.parse(atob(token.split('.')[1])).sub && (
                            <button
                                className="delete-comment-button"
                                onClick={() => handleDeleteComment(comment.id)}
                            >
                                삭제
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <div className="add-comment">
                <textarea
                    id="comment-input"
                    className="comment-textarea"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                />
                <button className="comment-add-button" onClick={handleAddComment}>
                    댓글 추가
                </button>
            </div>
        </div>
    );
}

export default Comments;
