package org.sample.backend.controller;

import org.sample.backend.config.JwtTokenProvider;
import org.sample.backend.entity.User;
import org.sample.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 회원가입 엔드포인트
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

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Map<String, Object> response = new HashMap<>();

        // 사용자 인증 로직 (예: AuthenticationManager를 사용하여 인증)
        try {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (!passwordEncoder.matches(password, user.getPassword())) {
                response.put("success", false);
                response.put("message", "Invalid credentials");
                return ResponseEntity.badRequest().body(response);
            }

            // JWT 토큰 생성
            String token = jwtTokenProvider.generateToken(username);

            response.put("success", true);
            response.put("token", token); // 토큰을 응답에 포함
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Login failed");
            return ResponseEntity.status(500).body(response);
        }
    }
}
