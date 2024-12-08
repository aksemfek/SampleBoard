package org.sample.backend.controller;

import org.sample.backend.entity.Comment;
import org.sample.backend.entity.Post;
import org.sample.backend.service.CommentService;
import org.sample.backend.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;

    public CommentController(CommentService commentService, PostService postService) {
        this.commentService = commentService;
        this.postService = postService;
    }

    // 특정 게시글의 댓글 목록 가져오기
    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long postId) {
        Post post = postService.getPostById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        List<Comment> comments = commentService.getCommentsByPost(post);
        return ResponseEntity.ok(comments);
    }

    // 댓글 추가
    @PostMapping("/{postId}/comments")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long postId,
            @RequestBody Comment comment,
            @AuthenticationPrincipal UserDetails userDetails) {

        Post post = postService.getPostById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        String username = userDetails.getUsername();
        Comment createdComment = commentService.addComment(post, username, comment);
        return ResponseEntity.ok(createdComment);
    }

    // 댓글 삭제
    @DeleteMapping("/{postId}/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long postId,
            @PathVariable Long commentId,
            @AuthenticationPrincipal UserDetails userDetails) {

        Comment comment = commentService.getCommentById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUser().getUsername().equals(userDetails.getUsername())) {
            return ResponseEntity.status(403).build();
        }

        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}
