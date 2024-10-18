package org.sample.backend.controller;

import org.sample.backend.entity.User;
import org.sample.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody Map<String, String> signUpData) {
        String username = signUpData.get("username");
        String email = signUpData.get("email");
        String password = signUpData.get("password");

        Map<String, Object> response = new HashMap<>();

        // 이메일 중복 확인
        if (userRepository.existsByEmail(email)) {
            response.put("success", false);
            response.put("message", "Email is already in use.");
            return ResponseEntity.badRequest().body(response);
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(password);

        // 새로운 사용자 생성
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(encodedPassword);

        userRepository.save(user);  // 사용자 저장

        response.put("success", true);
        return ResponseEntity.ok(response);
    }
}
