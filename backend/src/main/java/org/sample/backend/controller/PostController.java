package org.sample.backend.controller;

import org.sample.backend.entity.Post;
import org.sample.backend.entity.User;
import org.sample.backend.service.PostService;
import org.sample.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;
    private final UserService userService;

    public PostController(PostService postService, UserService userService) {
        this.postService = postService;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post, @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        User user = userService.getUserByUsername(username).orElseThrow();
        post.setUser(user);
        Post createdPost = postService.createPost(post);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // 특정 게시글 조회
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        Optional<Post> post = postService.getPostById(id);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 게시글 수정
    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost, @AuthenticationPrincipal UserDetails userDetails) {
        // 게시글 조회
        Optional<Post> postOptional = postService.getPostById(id);
        if (postOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Post existingPost = postOptional.get();

        // 작성자 확인
        String username = userDetails.getUsername();
        if (!existingPost.getUser().getUsername().equals(username)) {
            return ResponseEntity.status(403).build(); // 작성자가 아니면 403 Forbidden 반환
        }

        // 게시글 업데이트
        existingPost.setTitle(updatedPost.getTitle());
        existingPost.setContent(updatedPost.getContent());
        Post savedPost = postService.updatePost(existingPost);

        return ResponseEntity.ok(savedPost);
    }

}
