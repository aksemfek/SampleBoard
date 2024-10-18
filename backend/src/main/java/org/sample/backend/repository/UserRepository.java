package org.sample.backend.repository;

import org.sample.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);  // 이메일 중복 확인을 위한 메서드
    Optional<User> findByUsername(String username);  // 사용자 이름으로 사용자 찾기

}
