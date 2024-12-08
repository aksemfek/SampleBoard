package org.sample.backend.service;

import org.sample.backend.entity.Comment;
import org.sample.backend.entity.Post;
import org.sample.backend.entity.User;
import org.sample.backend.repository.CommentRepository;
import org.sample.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
    }

    // 특정 게시글의 댓글 가져오기
    public List<Comment> getCommentsByPost(Post post) {
        return commentRepository.findByPost(post);
    }

    // 특정 댓글 ID로 댓글 가져오기
    public Optional<Comment> getCommentById(Long commentId) {
        return commentRepository.findById(commentId);
    }

    // 댓글 추가
    public Comment addComment(Post post, String username, Comment comment) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        comment.setPost(post);
        comment.setUser(user);

        return commentRepository.save(comment);
    }

    // 댓글 삭제
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}
