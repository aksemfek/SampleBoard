import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Comments({ postId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comments/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => setComments(response.data))
            .catch(error => console.error('Failed to fetch comments:', error));
    }, [postId, token]);

    const handleAddComment = () => {
        axios.post(
            `http://localhost:8080/api/comments/${postId}`,
            { content: newComment },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                setComments([...comments, response.data]);
                setNewComment('');
            })
            .catch(error => console.error('Failed to add comment:', error));
    };

    return (
        <div className="comments-section">
            <h2>댓글</h2>
            <ul className="comments-list">
                {comments.map(comment => (
                    <li key={comment.id} className="comment-item">
                        <p>{comment.content}</p>
                        <small>{comment.user.username}</small>
                    </li>
                ))}
            </ul>
            <div className="add-comment">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                />
                <button onClick={handleAddComment}>댓글 추가</button>
            </div>
        </div>
    );
}

export default Comments;
