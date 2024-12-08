package org.sample.backend.controller;

import org.sample.backend.entity.Comment;
import org.sample.backend.entity.Post;
import org.sample.backend.entity.User;
import org.sample.backend.service.CommentService;
import org.sample.backend.service.PostService;
import org.sample.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;
    private final PostService postService;
    private final UserService userService;

    public CommentController(CommentService commentService, PostService postService, UserService userService) {
        this.commentService = commentService;
        this.postService = postService;
        this.userService = userService;
    }

    @GetMapping("/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable Long postId) {
        Post post = postService.getPostById(postId).orElseThrow();
        List<Comment> comments = commentService.getCommentsByPost(post);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/{postId}")
    public ResponseEntity<Comment> addComment(
            @PathVariable Long postId,
            @RequestBody Comment comment,
            @AuthenticationPrincipal UserDetails userDetails) {

        Post post = postService.getPostById(postId).orElseThrow();
        User user = userService.getUserByUsername(userDetails.getUsername()).orElseThrow();

        comment.setPost(post);
        comment.setUser(user);

        Comment savedComment = commentService.addComment(comment);
        return ResponseEntity.ok(savedComment);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long commentId,
            @AuthenticationPrincipal UserDetails userDetails) {

        Comment comment = commentService.getCommentsByPost(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getUser().getUsername().equals(userDetails.getUsername())) {
            return ResponseEntity.status(403).build();
        }

        commentService.deleteComment(commentId);
        return ResponseEntity.ok().build();
    }
}
