package org.sample.backend.service;

import org.sample.backend.entity.User;
import org.sample.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 사용자 ID로 사용자 조회
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    // 사용자 이름(username)으로 사용자 조회
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
